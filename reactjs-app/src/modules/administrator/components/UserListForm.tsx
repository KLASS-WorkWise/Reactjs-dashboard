import React, { useEffect, useState } from "react";
import { getAllUser } from "../services/userService";

const UserListForm = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        getAllUser().then(setUsers);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Danh sách người dùng</h2>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Username</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Full Name</th>
                            <th className="py-3 px-6 text-left">Roles</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b border-gray-200 hover:bg-gray-50"
                            >
                                <td className="py-3 px-6">{user.id}</td>
                                <td className="py-3 px-6">{user.username}</td>
                                <td className="py-3 px-6">{user.email}</td>
                                <td className="py-3 px-6">{user.fullName}</td>
                                <td className="py-3 px-6">
                                    {user.roles?.join(", ") || "No roles"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserListForm;
