import React from "react";
import ThemeProvider from "./ThemeProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { ToastProvider } from "./ToastProvider";
interface Props {
  children: React.ReactNode;
}
export default function AppProviders({ children }: Props) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <ToastProvider>{children}</ToastProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
