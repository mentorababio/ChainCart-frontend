import React from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface TextareaFieldProps {
  id: string;
  label?: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  errorMessage?: string | boolean;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  containerClassName?: string;
}

export function TextareaField({
  id,
  label,
  placeholder,
  required = false,
  disabled = false,
  className = "",
  containerClassName = "",
  value,
  onChange,
  onBlur,
  onFocus,
  errorMessage,
}: TextareaFieldProps) {
  const borderColor = errorMessage
    ? "border-red-500 focus:ring-red-500"
    : "border-[#E7E7E8] dark:border-gray-600 focus:ring-codeline-200";

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <Label htmlFor={id} className="text-gray-800 dark:text-gray-200 text-lg block mb-2">
          {label}
          {required && <span className="text-red-500 font-black ml-[2px]">*</span>}
        </Label>
      )}
      <Textarea
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        name={id}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={`min-h-[200px] bg-[#F9F9F9] dark:bg-gray-800 text-black dark:text-white py-6 ${borderColor} ${className}`}
      />
      {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
}
