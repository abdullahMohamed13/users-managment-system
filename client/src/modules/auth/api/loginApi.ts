import apiClient from "@/services/apiClient";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    email: string;
    name: string;
    id: number;
  };
}

export function loginApi(data: LoginPayload): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>(`/login`, data);
}
