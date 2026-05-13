"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, UserPlus, Trash2, LogOut, Menu, X } from "lucide-react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
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

const navItems = [
  { href: "/dashboard/users", icon: Users, labelKey: "users" },
  { href: "/dashboard/users/create", icon: UserPlus, labelKey: "addUser" },
];

export default function Sidebar({ className }: SidebarProps) {
  const t = useTranslations("dashboard.sidebar");
  const router = useRouter();
  const locale = useLocale();
  const { toast } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentUserId = TokenService.getUserId();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleLogoutAndRedirect = useCallback(() => {
    TokenService.removeToken();
    router.push("/login");
  }, [router]);

  const handleDelete = useCallback(
    (id: number) => {
      setDeleteError(null);
      deleteUser(id, {
        onSuccess: () => {
          setShowDeleteModal(false);
          setDeleteError(null);
          toast("User deleted successfully");
          if (id === currentUserId) {
            handleLogoutAndRedirect();
          }
        },
        onError: () => {
          setDeleteError("User not found. Please enter a valid existing ID.");
        },
      });
    },
    [deleteUser, currentUserId, handleLogoutAndRedirect, toast],
  );

  const closeDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
    setDeleteError(null);
  }, []);

  const nextLocale = locale === "en" ? "ar" : "en";

  const sidebarContent = (
    <>
      <div className="p-6 border-b ds-border-sm flex items-center justify-between">
        <Logo />
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1 ds-rounded-md hover:ds-bg-primary-200 transition-colors cursor-pointer"
        >
          <X size={20} className="ds-text-secondary" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 ds-rounded-md ds-text-secondary hover:ds-bg-primary-200 transition-all duration-200 font-medium"
          >
            <item.icon size={20} />
            <span>{t(item.labelKey)}</span>
          </Link>
        ))}

        <button
          onClick={() => { setShowDeleteModal(true); setMobileOpen(false); }}
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
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 ds-bg ds-rounded-md ds-shadow-md border ds-border-sm cursor-pointer"
      >
        <Menu size={22} className="ds-text-primary" />
      </button>

      <aside
        className={cn(
          "hidden lg:flex ds-bg h-screen w-64 flex-col border-e ds-border-sm shrink-0",
          className,
        )}
      >
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 z-50 h-screen w-64 ds-bg flex flex-col border-e ds-border-sm shadow-2xl lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {showDeleteModal && (
        <DeleteModal
          onConfirm={(id) => handleDelete(id)}
          onClose={closeDeleteModal}
          error={deleteError}
          isPending={isDeleting}
        />
      )}
    </>
  );
}
