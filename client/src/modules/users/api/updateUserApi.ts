import apiClient from "@/services/apiClient";

export interface UpdateUserPayload {
  name: string;
  email: string;
}

export interface UpdateUserResponse {
  email: string;
  name: string;
  id: number;
}

export function updateUserApi({
  id,
  data,
}: {
  id: number;
  data: UpdateUserPayload;
}): Promise<UpdateUserResponse> {
  return apiClient.patch<UpdateUserResponse>(`/users/${id}`, data);
}
