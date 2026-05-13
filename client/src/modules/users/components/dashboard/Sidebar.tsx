"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, UserPlus, Trash2, LogOut } from "lucide-react";
import { useLocale } from "next-intl";
import Logo from "@/components/atoms/logo";
import { ThemeToggle } from "@/components/atoms/ThemeButton";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { TokenService } from "@/services/tokenService";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import DeleteModal from "./DeleteModal";
import { changeLocaleAction } from "@/i18n/locale";
import { useToast } from "@/providers/ToastProvider";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const t = useTranslations("dashboard.sidebar");
  const router = useRouter();
  const locale = useLocale();
  const { toast } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const currentUserId = TokenService.getUserId();
  const { mutate: deleteUser } = useDeleteUser();

  const handleLogoutAndRedirect = useCallback(() => {
    TokenService.removeToken();
    router.push("/login");
  }, [router]);

  const handleDelete = useCallback(
    (id: number) => {
      setShowDeleteModal(false);
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

  const nextLocale = locale === "en" ? "ar" : "en";

  return (
    <>
      <aside
        className={cn(
          "ds-bg h-screen w-64 flex flex-col border-e ds-border-sm shrink-0",
          className,
        )}
      >
        <div className="p-6 border-b ds-border-sm">
          <Logo />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/dashboard/users"
            className="flex items-center gap-3 px-4 py-3 ds-rounded-md ds-text-secondary hover:ds-bg-primary-200 transition-all duration-200 font-medium"
          >
            <Users size={20} />
            <span>{t("users")}</span>
          </Link>

          <Link
            href="/dashboard/users/create"
            className="flex items-center gap-3 px-4 py-3 ds-rounded-md ds-text-secondary hover:ds-bg-primary-200 transition-all duration-200 font-medium"
          >
            <UserPlus size={20} />
            <span>{t("addUser")}</span>
          </Link>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-3 px-4 py-3 w-full ds-rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-200 font-medium cursor-pointer"
          >
            <Trash2 size={20} />
            <span>{t("deleteUser")}</span>
          </button>
        </nav>

        <div className="p-4 border-t ds-border-sm flex items-center justify-between">
          <ThemeToggle />
          <button
            onClick={() => changeLocaleAction(nextLocale)}
            className="w-10 h-10 ds-rounded-md ds-bg-primary text-white text-sm font-bold hover:opacity-90 transition-all cursor-pointer"
          >
            {locale === "en" ? "AR" : "EN"}
          </button>
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={() => {
              toast("Logged out successfully");
              setTimeout(handleLogoutAndRedirect, 300);
            }}
            className="flex items-center gap-3 px-4 py-3 w-full ds-rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-200 font-medium cursor-pointer"
          >
            <LogOut size={20} />
            <span>{t("logout")}</span>
          </button>
        </div>
      </aside>

      {showDeleteModal && (
        <DeleteModal
          onConfirm={(id) => handleDelete(id)}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
