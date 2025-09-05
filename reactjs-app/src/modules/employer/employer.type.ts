export interface EmployerType {
  address: any;
  age: any;
  name: any;
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  active: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export type Gender = "Nam" | "Nữ";

export interface CreateEmployerRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: Gender;
  active: boolean;
  password: string;
}
