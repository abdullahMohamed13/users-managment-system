import { cn } from "@/lib/cn";
interface Props {
  children: React.ReactNode;

  size?: "sm" | "md" | "lg" | "xl" 
  variant?:"secondary" | "disabled" ;

  size?: "sm" | "md" | "lg" | "xl";
  variant?: "secondary" | "disabled";

  center?: boolean;
  className?: string;
}
export default function Title({
  children,
  size = "md",
  variant = "secondary",
  center = true,
  className = "p-0 capitalize font-regular",
}: Props) {
  const sizes = {
    sm: "ds-text-sm",
    md: "ds-text-base",
    lg: "ds-text-lg",
    xl: "ds-text-xl",
  };
  const variants = {
    secondary: "ds-text-secondary ",
    disabled: "ds-text-disabled",
  };
  return (
    <>
      <p
        className={cn(
          sizes[size],
          variants[variant],
          center ? "text-center" : "",
          className,
        )}
      >
        {children}
      </p>
    </>
  );
}
