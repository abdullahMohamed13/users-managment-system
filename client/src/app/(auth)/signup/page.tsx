"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSignup } from "@/modules/users/hooks/useSignup";
import { TokenService } from "@/services/tokenService";
import Logo from "@/components/atoms/logo";
import InputForm from "@/components/atoms/Input";
import Title from "@/components/atoms/Title";
import { useToast } from "@/providers/ToastProvider";

export default function SignupPage() {
  const t = useTranslations("auth.signup");
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: signup, isPending } = useSignup();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    signup(
      { name, email, password },
      {
        onSuccess: (data) => {
          TokenService.setToken(data.accessToken);
          toast("Account created successfully");
          setTimeout(() => router.push("/dashboard/users"), 400);
        },
        onError: (err) => {
          const serverMessage = (err as any)?.response?.data;
          if (typeof serverMessage === "string" && serverMessage.includes("Email already exists")) {
            setApiError("Email already exists. Please use a different email.");
          } else {
            setApiError("Sign up failed. Please try again.");
          }
        },
      },
    );
  };

  return (
    <div className="min-h-screen ds-bg-alt flex items-center justify-center p-4">
      <div className="w-full max-w-md ds-bg ds-rounded-2xl ds-shadow-lg p-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo />
          </div>
          <Title size="md" variant="primary">
            {t("subtitle")}
          </Title>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium ds-text-secondary">
              {t("nameLabel")}
            </label>
            <InputForm
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium ds-text-secondary">
              {t("emailLabel")}
            </label>
            <InputForm
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium ds-text-secondary">
              {t("passwordLabel")}
            </label>
            <InputForm
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("passwordPlaceholder")}
              required
            />
          </div>

          {apiError && (
            <p className="text-red-500 text-sm text-center">{apiError}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full ds-bg-primary text-white font-semibold py-3 ds-rounded-md hover:opacity-90 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? t("loading") : t("button")}
          </button>
        </form>

        <p className="text-center ds-text-secondary text-sm">
          {t("hasAccount")}{" "}
          <Link
            href="/login"
            className="ds-text-alt font-semibold hover:underline"
          >
            {t("loginLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
