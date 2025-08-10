import { FieldError, UseFormRegisterReturn } from "react-hook-form";
interface TextAreaProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error: FieldError;
  rows: number;
}

const TextArea = ({
  label,
  placeholder,
  register,
  error,
  rows,
}: TextAreaProps) => {
  return (
    <div className="w-full">
      <label htmlFor="" className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div>
        <textarea
          rows={rows}
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

export default TextArea;
