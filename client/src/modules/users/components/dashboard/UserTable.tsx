"use client";
import { useState, useMemo } from "react";
import useGetUsers from "../../hooks/useUsers";
import type { getUsersResponse } from "../../api/getUsersApi";
import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const ITEMS_PER_PAGE = 5;
type Action = "edit" | "delete";

interface UserTableProps {
  onAction: (action: Action, user: getUsersResponse) => void;
  currentUserId?: number | null;
  className?: string;
}

const actionStyles: Record<Action, string> = {
  edit: "bg-orange-500 hover:bg-orange-600 text-white",
  delete: "bg-red-500 hover:bg-red-600 text-white",
};

const actionKeys: Action[] = ["edit", "delete"];

export default function UserTable({ onAction, currentUserId, className }: UserTableProps) {
  const t = useTranslations("dashboard.table");
  const { data, isPending, error } = useGetUsers();
  const [page, setPage] = useState(1);

  const totalPages = useMemo(
    () => (data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 0),
    [data],
  );

  const paginatedUsers = useMemo(() => {
    if (!data) return [];
    const start = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [data, page]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 ds-border-sm" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        {t("failedToLoad")}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 ds-text-secondary">
        {t("noUsers")}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="overflow-x-auto ds-rounded-lg ds-shadow-sm border ds-border-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="ds-bg-primary text-white">
              <th className="p-4 font-semibold">{t("id")}</th>
              <th className="p-4 font-semibold">{t("name")}</th>
              <th className="p-4 font-semibold">{t("email")}</th>
              <th className="p-4 font-semibold text-center">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, idx) => (
              <tr
                key={user.id}
                className={cn(
                  "border-b ds-border-sm transition-colors",
                  idx % 2 === 0 ? "ds-bg" : "ds-bg-alt",
                  "hover:ds-bg-primary-200",
                )}
              >
                <td className="p-4 font-medium ds-text-primary">{user.id}</td>
                <td className="p-4 ds-text-secondary">
                  {user.id === currentUserId ? (
                    <span className="ds-text-alt font-semibold">
                      You ({user.name})
                    </span>
                  ) : (
                    user.name
                  )}
                </td>
                <td className="p-4 ds-text-secondary">{user.email}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    {actionKeys.map((action) => (
                      <button
                        key={action}
                        onClick={() => onAction(action, user)}
                        className={cn(
                          actionStyles[action],
                          "px-3 py-1.5 ds-rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer capitalize",
                        )}
                      >
                        {t(action)}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between ds-text-secondary">
          <span className="text-sm">
            {t("page")} {page} {t("of")} {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 ds-rounded-md hover:ds-bg-primary-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "w-8 h-8 ds-rounded-md text-sm font-medium transition-colors cursor-pointer",
                  p === page
                    ? "ds-bg-primary text-white"
                    : "hover:ds-bg-primary-200 ds-text-secondary",
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 ds-rounded-md hover:ds-bg-primary-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
