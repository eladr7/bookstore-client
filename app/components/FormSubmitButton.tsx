"use client";

import React from "react";
import { useFormStatus } from "react-dom";

interface FormSubmitButtonProps {
  txt: string;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ txt }) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} className="btn-primary">
      {txt}
    </button>
  );
};
