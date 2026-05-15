"use client";
import { useState } from "react";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import useGetUser from "../../hooks/useGetUser";
import { cn } from "@/lib/cn";
import { X, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useToast } from "@/providers/ToastProvider";
import type { UserResponse } from "../../api/getUserApi";

interface UpdateFormProps {
  userId: number | null;
  onClose: () => void;
  className?: string;
}

export default function UpdateForm({ userId, onClose, className }: UpdateFormProps) {
  const t = useTranslations("dashboard.updateForm");
  const { toast } = useToast();
  const { data, isPending: loadingUser } = useGetUser(userId ?? 0);
  const { mutate: updateUser, isPending: updating } = useUpdateUser();

  return (
    <div className={cn("ds-bg ds-rounded-lg ds-shadow-md border ds-border-sm", className)}>
      <div className="flex items-center justify-between p-4 border-b ds-border-sm">
        <h3 className="font-semibold ds-text-primary text-lg">{t("title")}</h3>
        <button
          onClick={onClose}
          className="p-1.5 ds-rounded-md hover:ds-bg-primary-200 transition-colors cursor-pointer"
        >
          <X size={18} className="ds-text-secondary" />
        </button>
      </div>

      <div className="p-4">
        {!userId && (
          <p className="ds-text-secondary text-sm text-center py-8">
            {t("selectUser")}
          </p>
        )}

        {loadingUser && userId && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 ds-border-sm" />
          </div>
        )}

        {userId && !loadingUser && data && (
          <FormBody
            key={userId}
            initialData={data}
            onUpdate={(name, email) =>
              updateUser(
                { id: userId, data: { name, email } },
                { onSuccess: () => { toast("User updated successfully"); onClose(); } },
              )
            }
            updating={updating}
          />
        )}
      </div>
    </div>
  );
}

interface FormBodyProps {
  initialData: UserResponse;
  onUpdate: (name: string, email: string) => void;
  updating: boolean;
}

function FormBody({ initialData, onUpdate, updating }: FormBodyProps) {
  const t = useTranslations("dashboard.updateForm");
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onUpdate(name, email); }} className="space-y-4">
      <div>
        <label className="block text-sm font-medium ds-text-secondary mb-1">
          {t("nameLabel")}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full h-11 ds-rounded-md border ds-border-sm px-3 outline-none ds-bg-form ds-text-primary focus:border-[var(--color-primary)] transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium ds-text-secondary mb-1">
          {t("emailLabel")}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-11 ds-rounded-md border ds-border-sm px-3 outline-none ds-bg-form ds-text-primary focus:border-[var(--color-primary)] transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={updating}
        className="w-full flex items-center justify-center gap-2 ds-bg-primary text-white font-semibold py-3 ds-rounded-md hover:opacity-90 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save size={18} />
        {updating ? t("updating") : t("updateButton")}
      </button>
    </form>
  );
}
