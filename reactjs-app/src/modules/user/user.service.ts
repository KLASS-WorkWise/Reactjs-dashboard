import axios from "axios";
import type { GetAllUserResponse, UserType } from "./user.type";


export const fetchUsers = async (page: number = 0): Promise<GetAllUserResponse> => {
  const response = await axios.get('http://localhost:8080/api/users?page=' + page);
  return response.data;
};

export const createUser = async (payload: Omit<UserType, 'id'>) => {
  const response = await axios.post('http://localhost:8080/api/users', payload);
  return response.data;
};

export const updateUser = async (payload: UserType) => {
  const { id, ...data } = payload;
  const response = await axios.patch(`http://localhost:8080/api/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string | number) => {
  const response = await axios.delete(`http://localhost:8080/api/users/${id}`);
  return response.data;
};

