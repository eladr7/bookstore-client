interface FormFieldWrapperProps {
  heading: string;
  errorMsg: string | null;
  children?: React.ReactNode;
}
const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  heading,
  errorMsg,
  children,
}) => {
  return (
    <label>
      <span>{heading}:</span>
      {children}
      {errorMsg && <p className="text-red-500 -mt-4 mb-2">{errorMsg}</p>}
    </label>
  );
};

export default FormFieldWrapper;
