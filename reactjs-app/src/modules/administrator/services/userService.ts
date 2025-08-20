
// import type { Task } from '../types';

// const baseUrl = 'https://server.aptech.io';

import {  axiosPublic, axiosPrivate } from '../../../libs/axiosClient';

export const getAllUser = async () => {
  const response = await axiosPrivate.get('/users');
  // API trả về { data: [...] }
  return response.data.data;
};

// // Always get the latest token from the correct storage
// const getAuthHeaders = () => {
//   const authStorage = localStorage.getItem('auth-storage-for-login');
//   let access_token = '';
//   if (authStorage) {
//     try {
//       const parsed = JSON.parse(authStorage);
//       // Support both old and new storage shape
//       access_token = parsed?.state?.access_token || parsed?.access_token || '';
//     } catch (e) {
//       access_token = '';
//     }
//   }
//   return {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     ...(access_token && { Authorization: `Bearer ${access_token}` }),
//   };
// };

// export const login = async (username: string, password: string) => {
//   const response = await fetch(`${baseUrl}/auth/login`, {
//     method: 'POST',
//     headers: getAuthHeaders(),
//     body: JSON.stringify({ username, password }),
//   });
//   return response.json();
// };

// const extractArray = (data: any): Task[] => {
//   if (Array.isArray(data)) return data;
//   if (data?.data && Array.isArray(data.data)) return data.data;
//   if (data?.tasks && Array.isArray(data.tasks)) return data.tasks;
//   return [];
// };

// export const getTasks = async () => {
//   const response = await fetch(`${baseUrl}/workspaces/tasks`, {
//     headers: getAuthHeaders(),
//   });
//   const data = await response.json();
//   const arr = extractArray(data);
//   if (!arr.length) {
//     console.error('Unexpected API response format:', data);
//   }
//   return arr;
// };

// export const getTaskById = async (id: number) => {
//   const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
//     headers: getAuthHeaders(),
//   });
//   return response.json();
// };

// export const createTask = async (task: Partial<Task>) => {
//   const response = await fetch(`${baseUrl}/workspaces/tasks`, {
//     method: 'POST',
//     headers: getAuthHeaders(),
//     body: JSON.stringify(task),
//   });
//   return response.json();
// };

// export const updateTask = async (id: number, task: Task) => {
//   const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
//     method: 'PATCH',
//     headers: getAuthHeaders(),
//     body: JSON.stringify(task),
//   });
//   return response.json();
// };

// export const deleteTask = async (id: number) => {
//   const response = await fetch(`${baseUrl}/workspaces/tasks/${id}`, {
//     method: 'DELETE',
//     headers: getAuthHeaders(),
//   });
//   return response.json();
// };

// export const getTasksByAssignee = async (assigneeId: number) => {
//   const response = await fetch(`${baseUrl}/workspaces/tasks/assignee/${assigneeId}`, {
//     headers: getAuthHeaders(),
//   });
//   const data = await response.json();
//   const arr = extractArray(data);
//   if (!arr.length) {
//     console.error('Unexpected API response format:', data);
//   }
//   return arr;
// };
