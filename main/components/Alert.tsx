interface AlertProps {
  variant: "error" | "success" | "info";
  message: string;
  onClose?: () => void;
}

export default function Alert({ variant, message, onClose }: AlertProps) {
  const bgColor = {
    error: "bg-red-50",
    success: "bg-green-50",
    info: "bg-blue-50",
  };

  const borderColor = {
    error: "border-red-500",
    success: "border-green-500",
    info: "border-blue-500",
  };

  const textColor = {
    error: "text-red-600",
    success: "text-green-600",
    info: "text-blue-600",
  };

  return (
    <div
      className={`mt-12 px-4 rounded-md border-l-4 ${borderColor[variant]} ${bgColor[variant]} md:px-8`}
    >
      <div className="flex justify-between py-3">
        <div className="flex">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${textColor[variant]}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="self-center ml-3">
            <span className={textColor[variant]}>Error</span>
            <p className={`${textColor[variant]} mt-1`}>{message}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={() => onClose()}
            className={`"self-start ${textColor[variant]}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
