"use client";
import Link from "next/link";
import Logo from "../atoms/logo";
import Button from "../atoms/Button";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Templates", href: "/templates" },
  { label: "Pricing", href: "/pricing" },
  { label: "Integrations", href: "/integrations" },
];

const secondaryLinks = [
  { label: "Help Center", href: "/help-center" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "FAQs", href: "/faqs" },
];

export default function Footer() {
  return (
    <footer className="ds-bg mt-24 border-t border-neutral-200">
      <div className="ds-container mx-auto space-y-10 py-10">
        {/* Top brand + newsletter */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo />
            <p className="mt-3 text-sm ds-text-secondary max-w-md">
              Make smarter decisions with better data.
            </p>
            <p className="mt-1 text-sm ds-text-secondary">
              Create surveys, gather feedback, and grow.
            </p>
          </div>

          <form
            className="flex w-full max-w-md overflow-hidden rounded-full border border-neutral-300 bg-white"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Stay informed by entering your email"
              className="w-full px-4 py-2 text-sm outline-none ds-bg"
            />
            <Button
              type="submit"
              size="md"
              variant="primary"
              className="rounded-none rounded-r-full px-6"
            >
              Enter
            </Button>
          </form>
        </div>

        <hr className="border-neutral-200" />

        {/* Middle links + contact + social */}
        <div className="grid gap-8 text-sm md:grid-cols-4">
          <div className="space-y-2">
            {primaryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block ds-text-secondary hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-2">
            {secondaryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block ds-text-secondary hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-2">
            <p className="font-semibold ds-text-secondary">E-mail us at</p>
            <a
              href="mailto:Support@example.com"
              className="ds-text-secondary hover:underline"
            >
              Support@example.com
            </a>
          </div>

          <div className="space-y-2">
            <p className="font-semibold ds-text-secondary">Follow us</p>
            <div className="flex items-center gap-3">
              <Link
                href="https://x.com"
                target="_blank"
                className="ds-text-secondary hover:underline"
              >
                X
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="ds-text-secondary hover:underline"
              >
                in
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-neutral-200" />

        <p className="text-center text-xs ds-text-secondary">
          ©2025 SurveyLand. All rights reserved
        </p>
      </div>
    </footer>
  );
}
