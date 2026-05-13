import Link from "next/link";
import { cn } from "@/lib/cn";

interface Props {
  href: string;
  children?: React.ReactNode;
  /**
   * util classes defined in `/src/app/globals.css` under the
   * `.ds-text-*` utilities.  The default value uses the primary
   * text colour from the design system.
   */
  variant?: "primary" | "secondary" | "disabled";
  className?: string;
}

export default function TextLink({
  href,
  children = "View All",
  variant = "secondary",
  className = "capitalize font-normal cursor-pointer",
}: Props) {
  const variants = {
    primary: "ds-text-primary",
    secondary: "ds-text-secondary",
    disabled: "ds-text-disabled",
  };

  return (
    <Link href={href} className={cn(variants[variant], className)}>
      {children}
    </Link>
  );
}
