"use client";
import { useApiMutation } from "@/hooks/useApiMutation";
import { loginApi } from "../api/loginApi";
import { useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: loginApi,
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    },
  });
}
