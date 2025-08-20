import React, { useEffect, useState } from "react";
import { getAllUser } from "../user.service";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const ListUserTable = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        getAllUser().then(setUsers);
    }, []);

    return (
        <div className="p-8 h-[calc(100vh-100px)] flex items-start">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full h-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Danh sách người dùng</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center gap-2">
                        <PlusOutlined /> Thêm mới
                    </button>
                </div>
                <div className="overflow-x-auto h-full">
                    <table className="w-full table-auto rounded-lg h-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Username</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Full Name</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Roles</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                >
                                    <td className="px-4 py-3">{user.id}</td>
                                    <td className="px-4 py-3">{user.username}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.fullName}</td>
                                    <td className="px-4 py-3">
                                        {user.roles && user.roles.length > 0 ? (
                                            <div className="flex gap-2 flex-wrap">
                                                {user.roles.map((role: string, i: number) => (
                                                    <span
                                                        key={i}
                                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${role === "Administrators"
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
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button className="border border-gray-300 rounded px-2 py-1 flex items-center gap-1 text-gray-700 hover:bg-gray-100 transition">
                                                <EditOutlined />
                                            </button>
                                            <button className="border border-red-300 rounded px-2 py-1 flex items-center gap-1 text-red-500 hover:bg-red-50 transition">
                                                <DeleteOutlined />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListUserTable;