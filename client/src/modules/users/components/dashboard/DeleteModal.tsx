"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface DeleteModalProps {
  onConfirm: (id: number) => void;
  onClose: () => void;
  userId?: number;
  userName?: string;
  error?: string | null;
  isPending?: boolean;
}

export default function DeleteModal({ onConfirm, onClose, userId, userName, error, isPending }: DeleteModalProps) {
  const [inputId, setInputId] = useState("");
  const isSpecificUser = userId !== undefined && userId > 0;

  const handleConfirm = () => {
    const id = isSpecificUser ? userId : Number(inputId);
    if (!id || id <= 0) return;
    onConfirm(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        className="ds-bg ds-rounded-2xl ds-shadow-lg w-full max-w-sm mx-auto p-6 space-y-4"
      >
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

        {isSpecificUser ? (
          <div className="space-y-4">
            <p className="ds-text-secondary text-sm">
              Are you sure you want to delete <span className="font-semibold ds-text-primary">{userName}</span> (ID: {userId})?
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isPending}
                className="flex-1 py-3 ds-rounded-md ds-border-sm border ds-text-secondary font-medium hover:ds-bg-primary-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isPending}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 ds-rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium ds-text-secondary mb-1">
                User ID
              </label>
              <input
                type="number"
                min="1"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                placeholder="Enter user ID"
                required
                disabled={isPending}
                className="w-full h-11 ds-rounded-md border ds-border-sm px-3 outline-none ds-bg-form ds-text-primary placeholder:ds-text-disabled focus:border-[var(--color-primary)] transition-colors disabled:opacity-50"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs">{error}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isPending}
                className="flex-1 py-3 ds-rounded-md ds-border-sm border ds-text-secondary font-medium hover:ds-bg-primary-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isPending}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 ds-rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
