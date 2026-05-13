"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { X } from "lucide-react";

interface DeleteModalProps {
  onConfirm: (id: number) => void;
  onClose: () => void;
}

export default function DeleteModal({ onConfirm, onClose }: DeleteModalProps) {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Number(userId);
    if (!id || id <= 0) return;
    onConfirm(id);
    setUserId("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="ds-bg ds-rounded-2xl ds-shadow-lg w-full max-w-sm mx-4 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold ds-text-primary text-lg">
            Delete User
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 ds-rounded-md hover:ds-bg-primary-200 transition-colors cursor-pointer"
          >
            <X size={18} className="ds-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium ds-text-secondary mb-1">
              User ID
            </label>
            <input
              type="number"
              min="1"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
              required
              className="w-full h-11 ds-rounded-md border ds-border-sm px-3 outline-none ds-bg-form ds-text-primary placeholder:ds-text-disabled focus:border-[var(--color-primary)] transition-colors"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 ds-rounded-md ds-border-sm border ds-text-secondary font-medium hover:ds-bg-primary-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 ds-rounded-md transition-all duration-200 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
