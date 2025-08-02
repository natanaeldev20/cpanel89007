import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Option {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  label?: string;
  options: Option[];
  disabled?: boolean;
  className?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const SelectInput = ({
  label,
  options,
  disabled = false,
  className = "",
  register,
  error,
}: SelectInputProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        {...register}
        disabled={disabled}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 input-focus transition-all"
      >
        <option value="">-- Selecciona una opción --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error?.message && (
        <span className="text-red-600 text-sm font-medium">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default SelectInput;
