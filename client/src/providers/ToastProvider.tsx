"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { CheckCircle, XCircle, X } from "lucide-react";

type ToastType = "success" | "error";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-[100] flex flex-col gap-3 w-[calc(100%-2rem)] sm:max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.95 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              layout
              className={cn(
                "flex items-start gap-3 p-4 ds-rounded-lg shadow-lg border ds-border-sm",
                t.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800",
              )}
            >
              {t.type === "success" ? (
                <CheckCircle size={20} className="shrink-0 mt-0.5 text-green-600" />
              ) : (
                <XCircle size={20} className="shrink-0 mt-0.5 text-red-600" />
              )}
              <p className="text-sm font-medium flex-1">{t.message}</p>
              <button
                onClick={() => remove(t.id)}
                className="shrink-0 p-0.5 rounded hover:opacity-70 transition-opacity cursor-pointer"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
