import axios from "axios";

export const fetchProfile = async (userId: number | string) => {
  const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
  return response.data;
};
