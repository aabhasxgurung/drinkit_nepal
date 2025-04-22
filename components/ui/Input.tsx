export const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  value,
  isMultiline = false,
  handleChange,
  handleBlur,
  error,
  touched,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  isMultiline?: boolean;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  touched?: boolean;
  error?: string;
}) => {
  const baseClass =
    "w-full px-4 py-3 rounded-lg border focus:outline-none focus:!ring-blue-100 focus:!border-blue-100 transition-colors font-sans";
  const errorClass = !!error && touched ? "border-red-500" : "border-gray-300";

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1 "
      >
        {label}
      </label>

      {isMultiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          placeholder={placeholder}
          className={`${baseClass} ${errorClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`${baseClass} ${errorClass}`}
        />
      )}

      {error && touched && (
        <span className="text-red-500 !normal-case font-sans S text-xs">
          {error}
        </span>
      )}
    </div>
  );
};
