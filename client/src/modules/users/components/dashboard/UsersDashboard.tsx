"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import UserTable from "./UserTable";
import UpdateForm from "./UpdateForm";
import DeleteModal from "./DeleteModal";
import type { getUsersResponse } from "../../api/getUsersApi";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { TokenService } from "@/services/tokenService";
import { useToast } from "@/providers/ToastProvider";

export default function UsersDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const currentUserId = TokenService.getUserId();

  const { mutate: deleteUser } = useDeleteUser();

  const handleLogoutAndRedirect = useCallback(() => {
    TokenService.removeToken();
    router.push("/signup");
  }, [router]);

  const handleDelete = useCallback(
    (id: number) => {
      deleteUser(id, {
        onSuccess: () => {
          toast("User deleted successfully");
          if (id === currentUserId) {
            handleLogoutAndRedirect();
          }
        },
      });
    },
    [deleteUser, currentUserId, handleLogoutAndRedirect, toast],
  );

  const handleTableAction = (
    action: "edit" | "delete",
    user: getUsersResponse,
  ) => {
    if (action === "edit") {
      setEditUserId(user.id);
    } else if (action === "delete") {
      setDeleteUserId(user.id);
    }
  };

  return (
    <div className="p-6 space-y-6 ds-bg-alt h-full overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserTable
            onAction={handleTableAction}
            currentUserId={currentUserId}
          />
        </div>

        <div className="space-y-6">
          <UpdateForm
            userId={editUserId}
            onClose={() => setEditUserId(null)}
          />
        </div>
      </div>

      {deleteUserId !== null && (
        <DeleteModal
          onConfirm={(id) => {
            setDeleteUserId(null);
            handleDelete(id);
          }}
          onClose={() => setDeleteUserId(null)}
        />
      )}
    </div>
  );
}
