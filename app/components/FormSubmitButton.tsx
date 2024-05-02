import React from "react";
import { useFormStatus } from "react-dom";

interface FormSubmitButtonProps {
  txt: string;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ txt }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="btn-primary disabled:bg-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {txt}
    </button>
  );
};
