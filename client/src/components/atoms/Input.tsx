"use client";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "@/assets/icons/icons";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: "w-full" | "w-fit";
}

const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  (
    {
      type = "text",
      placeholder,
      value,
      className = "mb-3",
      onChange,
      width = "w-full",
      ...rest
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);
    const isPassword = type === "password";
    const locale = useLocale();

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
          className={clsx(
            width,
            "h-11 rounded-md border-1 border-[#00B7C1] p-3/75 outline-none placeholder:text-gray-400",
            className,
            {
              "text-right placeholder:text-right": locale === "ar",
              "text-left placeholder:text-left": locale !== "ar",
            },
          )}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className={clsx(
              "absolute top-1/2 -translate-y-1/2 text-gray-500",
              locale === "ar" ? "left-3" : "right-3",
            )}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    );
  },
);

InputForm.displayName = "InputForm";
export default InputForm;
