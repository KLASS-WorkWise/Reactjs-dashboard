export interface UserType {
  id: number;
  username: string;
  email: string;
  fullName: string;
  status: string | null;
  roles: string[];
}

export interface GetAllUserResponse {
  data: UserType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
