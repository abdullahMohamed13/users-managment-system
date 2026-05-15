import apiClient from "@/services/apiClient";

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  accessToken: string;
  user: {
    email: string;
    name: string;
    id: number;
  };
}

export function signupApi(data: SignupPayload): Promise<SignupResponse> {
  return apiClient.post<SignupResponse>(`/register`, data);
}
