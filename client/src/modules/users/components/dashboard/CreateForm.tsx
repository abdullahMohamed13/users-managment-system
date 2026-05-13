"use client";
import { useState } from "react";
import { useCreateUser } from "../../hooks/useCreateUser";
import { cn } from "@/lib/cn";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useToast } from "@/providers/ToastProvider";

interface CreateFormProps {
  className?: string;
}

export default function CreateForm({ className }: CreateFormProps) {
  const t = useTranslations("dashboard.createForm");
  const { toast } = useToast();
  const { mutate: createUser, isPending } = useCreateUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    createUser(
      { name, email, password },
      {
        onSuccess: () => {
          toast("User created successfully");
          setName("");
          setEmail("");
          setPassword("");
        },
        onError: (err) => {
          const serverMessage = (err as any)?.response?.data;
          if (typeof serverMessage === "string" && serverMessage.includes("Email already exists")) {
            setApiError("Email already exists. Please use a different email.");
          } else {
            setApiError("Failed to create user. Please try again.");
          }
        },
      },
    );
  };

  return (
    <div className={cn("ds-bg ds-rounded-lg ds-shadow-md border ds-border-sm p-4", className)}>
      <h3 className="font-semibold ds-text-primary text-lg mb-4">
        {t("title")}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium ds-text-secondary mb-1">
            {t("nameLabel")}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("namePlaceholder")}
            required
            className="w-full h-11 ds-rounded-md border ds-border-sm px-3 outline-none ds-bg-form ds-text-primary placeholder:ds-text-disabled focus:border-[var(--color-primary)] transition-colors"
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
            placeholder={t("emailPlaceholder")}
            required
            className="w-full h-11 ds-rounded-md border ds-border-sm px-3 outline-none ds-bg-form ds-text-primary placeholder:ds-text-disabled focus:border-[var(--color-primary)] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium ds-text-secondary mb-1">
            {t("passwordLabel")}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("passwordPlaceholder")}
            required
            className="w-full h-11 ds-rounded-md border ds-border-sm px-3 outline-none ds-bg-form ds-text-primary placeholder:ds-text-disabled focus:border-[var(--color-primary)] transition-colors"
          />
        </div>

        {apiError && (
          <p className="text-red-500 text-sm text-center">{apiError}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 ds-bg-primary text-white font-semibold py-3 ds-rounded-md hover:opacity-90 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} />
          {isPending ? t("creating") : t("createButton")}
        </button>
      </form>
    </div>
  );
}
