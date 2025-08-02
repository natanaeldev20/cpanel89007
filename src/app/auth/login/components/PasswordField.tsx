import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

interface PasswordFieldProps {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const PasswordField = ({
  label,
  placeholder,
  register,
  error,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor="" className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <RiLockPasswordFill size={20} className="text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          {...register}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 input-focus transition-all"
        />
        <button
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
          type="button"
          onClick={handleClick}
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
      {error && (
        <span className="text-red-600 text-sm font-medium">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default PasswordField;
