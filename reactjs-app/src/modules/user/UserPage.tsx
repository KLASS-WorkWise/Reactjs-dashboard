import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Checkbox, DatePicker, Form, Input, message, Modal, Popconfirm, Select, Space, Table, type TableProps } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import dayjs from "dayjs";
import { useAppMessage } from '../../stores/useAppMessage';
import UserTable from "./components/UserTable";
import UserUpdate from "./components/UserUpdate";
import type { UserType } from "./user.type";
import type { EmployerType } from "../employer/employer.type";
import { deleteUser, fetchUsers, updateUser } from "./user.service";

const UserPage = () => {
    const queryClient = useQueryClient();
    const { sendMessage } = useAppMessage();
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [formAdd] = Form.useForm();

    const handleOkAdd = () => {
        formAdd.submit();
    };

    const msgSuccess = (msg: string) => {
        sendMessage({
            msg,
            type: 'success',
        })
    };

    const msgError = (msg: string) => {
        sendMessage({
            msg,
            type: 'error',
        })
    };

    //============================ Sử dụng useQuery để fetch data từ API ==========================================
    const queryUsers = useQuery<UserType[]>({
        queryKey: ["users"],
        queryFn: async () => fetchUsers(),
    });
    // console.log("dữ liệu lấy được khi call api là :", queryEmployers.data);
    //========================== end fetch data=========================================



    // begin update user
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const [formUpdate] = Form.useForm();


    // giải quyết vấn đề khi truyèn vào là 2003-13-08 là kiểu string nhưng thg antd lại mong kiểu dayj nên bị xung đột 
    const showModalUpdate = (user: UserType) => {
        // Nếu user.roles là mảng, lấy role đầu tiên hoặc truyền cả mảng nếu dùng Select nhiều lựa chọn
        formUpdate.setFieldsValue({
            ...user,
            role: Array.isArray(user.roles) ? user.roles[0] : user.roles // nếu chỉ chọn 1 role
            // hoặc roles: user.roles nếu dùng mode="multiple"
        });
        setIsModalUpdateOpen(true);
    };


    const handleOkUpdate = () => {
        formUpdate.submit();
    };

    const handleCancelUpdate = () => {
        setIsModalUpdateOpen(false);
    };

    const onHandleFinishUpdateFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const mutationUpdateUser = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            // reset form
            formUpdate.resetFields();

            //  tắt modal
            setIsModalUpdateOpen(false);
            msgSuccess("Cập nhật user thành công!");
            // làm tươi lại danh sách
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            msgError("Cập nhật user thất bại!");
            console.log('<<=== 🚀 error ===>>', error);
        }
    });


    //  update user
    const onHandleFinishUpdateUser = async (user: UserType) => {
        console.log("Cập nhật user với dữ liệu: ", user);
        await mutationUpdateUser.mutateAsync(user);
    };

    // end update users

    const deleteMutationUser = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            //Thông báo xóa thành công
            console.log('Xóa thành công');
            //làm tươi lại danh sách
            queryClient.invalidateQueries({ queryKey: ["users"] })
            msgSuccess("Xóa user thành công!");
        },
        onError: (error) => {
            console.log('<<=== 🚀 error ===>>', error);
            msgError("Xóa user thất bại!");
        }
    })

    // delete employer


    const columns: TableProps<UserType>['columns'] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Roles",
            dataIndex: "roles",
            key: "roles",
            render: (_, record) =>
                record.roles && record.roles.length > 0 ? (
                    <div className="flex gap-2 flex-wrap">
                        {record.roles.map((role: string, i: number) => (
                            <span
                                key={i}
                                className={`px-3 py-1 text-sm font-semibold rounded-full ${role === "Administrators"
                                    ? "bg-red-100 text-red-600"
                                    : role === "Employers"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : "bg-green-100 text-green-600"
                                    }`}
                            >
                                {role}
                            </span>
                        ))}
                    </div>
                ) : (
                    <span className="text-gray-400 italic">No roles</span>
                ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='dashed' onClick={() => {
                        //Lấy dữ liệu đổ vào form Update
                        formUpdate.setFieldsValue(record);
                        showModalUpdate(record);
                    }}>Edit</Button>

                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={async () => {
                            console.log('ok xoa');
                            await deleteMutationUser.mutateAsync(record.id)
                        }}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <Button danger type='dashed'>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>

            {/* list danh sách user */}
            <UserTable  // gọi đến tên bên file UserTable
                data={queryUsers.data}
                loading={queryUsers.isLoading}
                columns={columns}
                onAddClick={() => setIsModalAddOpen(true)}
            />



            {/* update user */}
            <UserUpdate    // tên này gọi từ file UserUpdate
                isModalUpdateOpen={isModalUpdateOpen}
                onOk={handleOkUpdate}
                onCancel={handleCancelUpdate}
                form={formUpdate}
                onFinish={onHandleFinishUpdateUser}
                onFinishFailed={onHandleFinishUpdateFailed}   // gọi đến hàm trên
                queryUsers={queryUsers}
            />


        </div>
    );
};

export default UserPage;
