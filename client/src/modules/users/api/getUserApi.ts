import apiClient from "@/services/apiClient";

export interface UserResponse {
  email: string;
  name: string;
  password?: string;
  id: number;
}

export function getUserApi(id: number): Promise<UserResponse> {
  return apiClient.get<UserResponse>(`/users/${id}`);
}
