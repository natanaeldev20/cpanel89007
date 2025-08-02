import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { FaUserAlt } from "react-icons/fa";

interface TextFieldProps {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const TextField = ({ label, placeholder, register, error }: TextFieldProps) => {
  return (
    <div className="w-full">
      <label htmlFor="" className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaUserAlt size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          {...register}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 input-focus transition-all"
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
