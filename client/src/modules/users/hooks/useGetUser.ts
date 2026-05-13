"use client";
import { useApiQuery } from "@/hooks/useApiQuery";
import { getUserApi } from "../api/getUserApi";

export default function useGetUser(id: number) {
  return useApiQuery({
    queryKey: ["user", id],
    queryFn: () => getUserApi(id),
    options: {
      enabled: !!id && id > 0,
      retry: 1,
    },
  });
}
