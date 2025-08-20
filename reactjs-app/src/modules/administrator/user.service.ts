import type { UserType } from "./user.type";


export const getAllUser = async (): Promise<UserType[]> => {
    const res = await fetch("http://localhost:8080/api/users");
    const data = await res.json();
        // Nếu API trả về { data: [...] } thì phải lấy data.data
    return Array.isArray(data) ? data : data.data || [];
};

export const updateUser = async (user: Partial<UserType> & { id: number }) => {
    const res = await fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    return res.json();
};

export const deleteUser = async (id: number) => {
    const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
    });
    return res.json();
};