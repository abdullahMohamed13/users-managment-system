"use client";
import { useApiMutation } from "@/hooks/useApiMutation";
import { updateUserApi } from "../api/updateUserApi";
import { useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: updateUserApi,
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    },
  });
}
