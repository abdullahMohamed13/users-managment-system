import { useApiMutation } from "@/hooks/useApiMutation";
import { signupApi } from "../../auth/api/signupApi";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateUser() {
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
