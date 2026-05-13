"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CreateForm from "@/modules/users/components/dashboard/CreateForm";
import { ArrowLeft } from "lucide-react";

export default function CreateUserPage() {
  const router = useRouter();

  return (
    <div className="p-4 sm:p-6 h-full overflow-y-auto ds-bg-alt">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-lg space-y-6"
      >
        <button
          onClick={() => router.push("/dashboard/users")}
          className="flex items-center gap-2 ds-text-secondary hover:ds-text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span>Back to Users</span>
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <CreateForm />
        </motion.div>
      </motion.div>
    </div>
  );
}
