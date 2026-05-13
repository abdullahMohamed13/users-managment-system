"use client";
import { useRouter } from "next/navigation";
import CreateForm from "@/modules/users/components/dashboard/CreateForm";
import { ArrowLeft } from "lucide-react";

export default function CreateUserPage() {
  const router = useRouter();

  return (
    <div className="p-6 h-full overflow-y-auto ds-bg-alt">
      <div className="max-w-lg space-y-6">
        <button
          onClick={() => router.push("/dashboard/users")}
          className="flex items-center gap-2 ds-text-secondary hover:ds-text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span>Back to Users</span>
        </button>
        <CreateForm />
      </div>
    </div>
  );
}
