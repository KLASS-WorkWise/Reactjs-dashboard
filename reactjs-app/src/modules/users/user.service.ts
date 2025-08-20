import { axiosPrivate } from '../../libs/axiosClient';

// gett all user
export const getAllUser = async () => {
  const response = await axiosPrivate.get('/users');
  return response.data.data;
};

// delete user 
export const deleteUser = async (id: string) => {
  const response = await axiosPrivate.delete(`/users/${id}`);
  return response.data.data;
};