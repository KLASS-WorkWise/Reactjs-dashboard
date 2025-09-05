import axios from "axios";
import type { CreateEmployerRequest, EmployerType } from "./employer.type";


export const fetchEmployers = async (): Promise<EmployerType[]> => {
    // const response = await fetch("/api/employers");  dùng fetch vẫn dc nhưng thôi ta dụng axios cho nó
    const response = await axios.get(`http://localhost:8080/api/employees`);  // sử dụng dấu ` ` vì lát nx mình còn nối chuỗi vì nếu xóa còn truyền id đồ dô nữa mà
    //  bắt buộc phải dùng return để thg queryFn nó bắt được giá trị và nó cache lại bằng cái key là [employers]
    return response.data;
};


export const createEmployer = async (payload: CreateEmployerRequest) => {
    const response = await axios.post(
        `http://localhost:8080/api/employees`,
        payload
    );
    return response.data;
};


export const updateEmployer = async (payload: EmployerType) => {
    const { id, ...data } = payload;
    const response = await axios.put(
        `http://localhost:8080/api/employees/${id}`,
        data
    );
    return response.data;
};

export const deleteEmployer = async (id: string | number) => {
    const response = await axios.delete(`http://localhost:8080/api/employees/${id}`);
    return response.data;
};