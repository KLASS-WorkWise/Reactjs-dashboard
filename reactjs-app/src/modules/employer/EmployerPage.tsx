import { useMutation, useQuery } from "@tanstack/react-query";
import { createEmployer, deleteEmployer, fetchEmployers, updateEmployer } from "./employer.service";
import { Button, Card, Checkbox, DatePicker, Form, Input, message, Modal, Popconfirm, Select, Space, Table, type TableProps } from "antd";
import type { CreateEmployerRequest, EmployerType, Gender } from "./employer.type";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import dayjs from "dayjs";
import EmployerTable from "./components/EmployerTable";
import EmployerAdd from "./components/EmployerAdd";
import EmployerUpdate from "./components/EmployerUpdate";
import { useAppMessage } from '../../stores/useAppMessage';

const EmployerPage = () => {
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
    const queryEmployers = useQuery<EmployerType[]>({
        queryKey: ["employers"],
        queryFn: async () => fetchEmployers(),
    });
    // console.log("dữ liệu lấy được khi call api là :", queryEmployers.data);
    //========================== end fetch data=========================================


    /** ---- BEGIN ADD EMPLOYER ---- */
    const mutationAddEmployer = useMutation({
        mutationFn: (values: CreateEmployerRequest) => createEmployer(values),
        onSuccess: () => {
            // reset form 
            formAdd.resetFields();

            // làm tươi lại danh sách và tthôngbaos thành công 
            setIsModalAddOpen(false);   // và tắt form thêm mới 
            msgSuccess("Thêm mới employer thành công!");
            queryClient.invalidateQueries({ queryKey: ["employers"] });  // làm tươi lại dlieu dùng react query
        },
        onError: (error) => {
            msgError("Thêm mới employer thất bại!");
            console.log('<<=== 🚀 error ===>>', error);
        }
    });

    const onHandleFinishAddEmployer = async (values: EmployerType) => {
        console.log("Thêm mới employer với dữ liệu: ", values);
        const createEmployerRequest: CreateEmployerRequest = {
            ...values,
            dateOfBirth: typeof values.dateOfBirth === "string"
                ? values.dateOfBirth
                : dayjs(values.dateOfBirth).format("YYYY-MM-DD"), // chuyển về string nếu là dayjs
            gender: values.gender as Gender
        };
        await mutationAddEmployer.mutateAsync(createEmployerRequest);
    };

    const onHandleFinishAddFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const handleCancelAdd = () => {
        setIsModalAddOpen(false);
    };
    /** ---- END ADD Employers ---- */

    // begin update employers
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const [formUpdate] = Form.useForm();


    // giải quyết vấn đề khi truyèn vào là 2003-13-08 là kiểu string nhưng thg antd lại mong kiểu dayj nên bị xung đột 
    const showModalUpdate = (employer: EmployerType) => {
        const employerWithFormattedDate = {
            ...employer,
            dateOfBirth: dayjs(employer.dateOfBirth), // Convert string -> dayjs
        };

        formUpdate.setFieldsValue(employerWithFormattedDate);
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

    const mutationUpdateEmployer = useMutation({
        mutationFn: updateEmployer,
        onSuccess: () => {
            // reset form
            formUpdate.resetFields();

            //  tắt modal
            setIsModalUpdateOpen(false);
            msgSuccess("Cập nhật employer thành công!");
            // làm tươi lại danh sách
            queryClient.invalidateQueries({ queryKey: ["employers"] });
        },
        onError: (error) => {
            msgError("Cập nhật employer thất bại!");
            console.log('<<=== 🚀 error ===>>', error);
        }
    });


    //  update employer
    const onHandleFinishUpdateEmployer = async (values: EmployerType) => {
        console.log("Cập nhật employer với dữ liệu: ", values);
        await mutationUpdateEmployer.mutateAsync(values);
    };

    // end update employers

    const deleteMutationBrand = useMutation({
        mutationFn: deleteEmployer,
        onSuccess: () => {
            //Thông báo xóa thành công
            console.log('Xóa thành công');
            //làm tươi lại danh sách
            queryClient.invalidateQueries({ queryKey: ["employers"] })
            msgSuccess("Xóa employer thành công!");
        },
        onError: (error) => {
            console.log('<<=== 🚀 error ===>>', error);
            msgError("Xóa employer thất bại!");
        }
    })

    // delete employer


    const columns: TableProps<EmployerType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Birth day',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
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
                            await deleteMutationBrand.mutateAsync(record.id)
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

            {/* list danh sách employer */}
            <EmployerTable   // gọi đến tên bên file EmployerTable
                data={queryEmployers.data}
                loading={queryEmployers.isLoading}
                columns={columns}
                onAddClick={() => setIsModalAddOpen(true)}
            />

            {/* thêm mớiemployer */}
            <EmployerAdd    // tên này gọi từ file EmployerAdd
                isModalAddOpen={isModalAddOpen}
                onOk={handleOkAdd}
                onCancel={handleCancelAdd}
                form={formAdd}
                onFinish={onHandleFinishAddEmployer}
                onFinishFailed={onHandleFinishAddFailed}   // gọi đến hàm trên
                queryEmployers={queryEmployers}
            />
            {/* end form modal thêm mới employer */}


            {/* update employer */}
            <EmployerUpdate    // tên này gọi từ file EmployerAdd
                isModalUpdateOpen={isModalUpdateOpen}
                onOk={handleOkUpdate}
                onCancel={handleCancelUpdate}
                form={formUpdate}
                onFinish={onHandleFinishUpdateEmployer}
                onFinishFailed={onHandleFinishUpdateFailed}   // gọi đến hàm trên
                queryEmployers={queryEmployers}
            />


        </div>
    );
};

export default EmployerPage;
