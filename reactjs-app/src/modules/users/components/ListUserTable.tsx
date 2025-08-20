import React, { useEffect, useState } from "react";
import { getAllUser } from "../user.service";
import { EditOutlined, DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Form, message, Popconfirm } from "antd";
import UserEdit from "./UserEdit";
import type { UserType } from "../user.type";

const ListUserTable = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<UserType | null>(null);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [editForm] = Form.useForm();

    useEffect(() => {
        getAllUser().then(setUsers);
    }, []);

    const handleUpdateUser = async (values: any) => {
        try {
            await fetch(`http://localhost:8080/api/users/${values.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    fullName: values.fullName,
                }),
            });
            message.success("Cập nhật thành công!");
            setEditFormVisible(false);
            getAllUser().then(setUsers);
        } catch (err) {
            message.error("Cập nhật thất bại!");
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await fetch(`http://localhost:8080/api/users/${id}`, {
                method: "DELETE",
            });
            message.success("Xóa thành công!");
            getAllUser().then(setUsers);
        } catch (err) {
            message.error("Xóa thất bại!");
        }
    };

    return (
        <div className="p-12 min-h-[80vh] flex items-start">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-full">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Danh sách người dùng</h2>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="flex items-center gap-2 text-base font-semibold"
                    >
                        Thêm mới
                    </Button>
                </div>
                <div className="overflow-auto">
                    <table className="w-full table-auto rounded-xl">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-4 text-left font-bold text-gray-700 text-lg">ID</th>
                                <th className="px-6 py-4 text-left font-bold text-gray-700 text-lg">Username</th>
                                <th className="px-6 py-4 text-left font-bold text-gray-700 text-lg">Email</th>
                                <th className="px-6 py-4 text-left font-bold text-gray-700 text-lg">Full Name</th>
                                <th className="px-6 py-4 text-left font-bold text-gray-700 text-lg">Roles</th>
                                <th className="px-6 py-4 text-left font-bold text-gray-700 text-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                >
                                    <td className="px-6 py-4 text-base">{user.id}</td>
                                    <td className="px-6 py-4 text-base">{user.username}</td>
                                    <td className="px-6 py-4 text-base">{user.email}</td>
                                    <td className="px-6 py-4 text-base">{user.fullName}</td>
                                    <td className="px-6 py-4 text-base">
                                        {user.roles && user.roles.length > 0 ? (
                                            <div className="flex gap-2 flex-wrap">
                                                {user.roles.map((role: string, i: number) => (
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
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-3">
                                            <Button
                                                type="dashed"
                                                icon={<EditOutlined />}
                                                onClick={() => {
                                                    setSelectedRecord(user);
                                                    editForm.setFieldsValue(user);
                                                    setEditFormVisible(true);
                                                }}
                                            />
                                            <Popconfirm
                                                title="Bạn có chắc muốn xóa user này?"
                                                onConfirm={() => handleDeleteUser(user.id)}
                                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                okText="Đồng ý"
                                                okType="danger"
                                                cancelText="Đóng"
                                            >
                                                <Button
                                                    danger
                                                    type="dashed"
                                                    icon={<DeleteOutlined />}
                                                />
                                            </Popconfirm>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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

export default ListUserTable;