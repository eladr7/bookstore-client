"use client";

import { createBook } from "@/app/actions";
import { FormSubmitButton } from "@/app/components/FormSubmitButton";
import { NewBookFields } from "@/app/lib/definitions";
import { formatCamelCaseString } from "@/app/lib/helpers";

import { useFormState } from "react-dom";

const FormInputFieldsMap = {
  title: "text",
  authorName: "text",
  price: "number",
  publicationDate: "date",
};

const initialState = {
  message: "",
};

interface CreateFromProps {
  genres: string[];
}
const CreateForm: React.FC<CreateFromProps> = ({ genres }) => {
  const [state, formAction] = useFormState(createBook, initialState);

  return (
    <form action={formAction} className="create-form w-1/2">
      {Object.entries(FormInputFieldsMap).map(
        ([k, v]: [string, string], i: number) => (
          <label key={k}>
            <span>
              {formatCamelCaseString(NewBookFields[k as NewBookFields])}:
            </span>
            <input required type={v} name={k} />
          </label>
        )
      )}

      <label>
        <span>{formatCamelCaseString(NewBookFields.description)}:</span>
        <textarea required name={NewBookFields.description} />
      </label>
      <label>
        <span>{formatCamelCaseString(NewBookFields.genre)}:</span>
        <select required name={NewBookFields.genre}>
          {genres.map((genre: string, i: number) => (
            <option value={genre} key={i}>
              {formatCamelCaseString(genre)}
            </option>
          ))}
        </select>
      </label>
      <FormSubmitButton txt="Add a book" />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
};
export default CreateForm;
