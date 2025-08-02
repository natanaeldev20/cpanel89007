import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextFieldProps {
  autoFocus?: boolean;
  label: string;
  type: "text" | "email" | "number";
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const TextField = ({
  autoFocus,
  label,
  type,
  placeholder,
  register,
  error,
}: TextFieldProps) => {
  return (
    <div className="w-full">
      <label htmlFor="" className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div>
        <input
          autoFocus
          type={type}
          {...register}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 input-focus transition-all"
        />
      </div>
      {error?.message && (
        <span className="text-red-600 text-sm font-medium">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default TextField;
