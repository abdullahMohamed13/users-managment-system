"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLogin } from "@/modules/users/hooks/useLogin";
import { TokenService } from "@/services/tokenService";
import Logo from "@/components/atoms/logo";
import InputForm from "@/components/atoms/Input";
import Title from "@/components/atoms/Title";
import { useToast } from "@/providers/ToastProvider";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: login, isPending, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: (data) => {
          TokenService.setToken(data.accessToken);
          toast("Logged in successfully");
          setTimeout(() => router.push("/dashboard/users"), 400);
        },
      },
    );
  };

  return (
    <div className="min-h-screen ds-bg-alt flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md ds-bg ds-rounded-2xl ds-shadow-lg p-6 sm:p-8 space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="text-center space-y-2"
        >
          <div className="flex justify-center">
            <Logo />
          </div>
          <Title size="md" variant="primary">
            {t("subtitle")}
          </Title>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="space-y-1"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="space-y-1"
          >
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
          </motion.div>

          {error && (
            <p className="text-red-500 text-sm text-center">{t("error")}</p>
          )}

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isPending}
            className="w-full ds-bg-primary text-white font-semibold py-3 ds-rounded-md hover:opacity-90 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? t("loading") : t("button")}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-center ds-text-secondary text-sm"
        >
          {t("noAccount")}{" "}
          <Link
            href="/signup"
            className="ds-text-alt font-semibold hover:underline"
          >
            {t("signupLink")}
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
