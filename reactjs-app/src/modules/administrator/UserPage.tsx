import React, { useEffect, useState } from "react";
import { Button, Form, message, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
// Update the import path below to the correct location of UserEdit, for example:
import UserEdit from "./components/UserEdit";
import ListUserTable from './pages/ListUserTable';
import type { UserType } from "./user.type";
import { getAllUser, updateUser, deleteUser, changeUserRole } from "./user.service";
import type { ColumnsType } from "antd/es/table";

const UserPage = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<UserType | null>(null);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [editForm] = Form.useForm();

    const ROLE_MAP: Record<string, number> = {
        "Administrators": 1,
        "Employers": 2,
        "Users": 3,
    };

    useEffect(() => {
        getAllUser().then(setUsers);
    }, []);

    const handleUpdateUser = async (values: any) => {
        try {
            await updateUser(values);
            await changeUserRole(values.id, values.role);
            message.success("Cập nhật thành công!");
            setEditFormVisible(false); // Đóng form edit
            editForm.resetFields();    // Reset form
            // Đợi cập nhật xong mới load lại users
            getAllUser().then(setUsers);
        } catch (err) {
            console.error(err);
            message.error("Cập nhật thất bại!");
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await deleteUser(id);
            message.success("Xóa thành công!");
            getAllUser().then(setUsers);
        } catch (err) {
            message.error("Xóa thất bại!");
        }
    };

    const columns: ColumnsType<UserType> = [
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
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="dashed"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSelectedRecord(record);
                            editForm.setFieldsValue({
                                ...record,
                                role: record.roles && record.roles.length > 0 ? ROLE_MAP[record.roles[0]] : undefined
                            });
                            setEditFormVisible(true);
                        }}
                    />
                    <Popconfirm
                        title="Bạn có chắc muốn xóa user này?"
                        onConfirm={() => handleDeleteUser(record.id)}
                        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                        okText="Đồng ý"
                        okType="danger"
                        cancelText="Đóng"
                    >
                        <Button danger type="dashed" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-12 min-h-[80vh] flex items-start">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-full">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Danh sách người dùng</h2>
                </div>
                <ListUserTable
                    data={users}
                    loading={false}
                    columns={columns}
                    onAddClick={() => { }}
                />
            </div>
            <UserEdit
                visible={editFormVisible}
                onOk={() => editForm.submit()}
                onCancel={() => setEditFormVisible(false)}
                form={editForm}
                onFinish={handleUpdateUser}
                onFinishFailed={() => { }}
            />
        </div>
    );
};

export default UserPage;