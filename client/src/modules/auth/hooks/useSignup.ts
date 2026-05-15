"use client";
import { useApiMutation } from "@/hooks/useApiMutation";
import { signupApi } from "../api/signupApi";
import { useQueryClient } from "@tanstack/react-query";

export function useSignup() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: signupApi,
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    },
  });
}
