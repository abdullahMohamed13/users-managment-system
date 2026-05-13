"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  const [userToDelete, setUserToDelete] = useState<getUsersResponse | null>(null);
  const currentUserId = TokenService.getUserId();

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

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
      setUserToDelete(user);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 ds-bg-alt h-full overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserTable
            onAction={handleTableAction}
            currentUserId={currentUserId}
          />
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {editUserId ? (
              <motion.div
                key="update-form"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.25 }}
              >
                <UpdateForm
                  userId={editUserId}
                  onClose={() => setEditUserId(null)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="update-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <UpdateForm
                  userId={null}
                  onClose={() => {}}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {userToDelete !== null && (
          <DeleteModal
            userId={userToDelete.id}
            userName={userToDelete.name}
            isPending={isDeleting}
            onConfirm={(id) => {
              setUserToDelete(null);
              handleDelete(id);
            }}
            onClose={() => setUserToDelete(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
