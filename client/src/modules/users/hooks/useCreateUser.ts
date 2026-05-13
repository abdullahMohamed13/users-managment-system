import { useApiMutation } from "@/hooks/useApiMutation";
import { createUser } from "../api/createUserApi";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: createUser,
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    },
  });
}
