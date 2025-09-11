import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FileInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error: FieldError;
  onChange?: (file: File) => void;
}

const FileInput = ({ label, register, error, onChange }: FileInputProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor=""
        className="text-sm font-medium text-gray-700 dark:text-white/90"
      >
        {label}
      </label>
      <div>
        <input
          autoFocus
          type="file"
          accept="image/*"
          {...register}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && onChange) {
              onChange(file);
            }
          }}
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

export default FileInput;
