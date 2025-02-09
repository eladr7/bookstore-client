"use client";

import { createBook, createBookMutation } from "@/app/actions";
import FormFieldWrapper from "@/app/components/FormFieldWrapper";
import { FormSubmitButton } from "@/app/components/FormSubmitButton";
import { BookAppendedMsg, NewBookFields } from "@/app/lib/definitions";
import {
  CreateBookSchema,
  createBookSchema,
  formatCamelCaseString,
} from "@/app/lib/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const FormInputFieldsMap = {
  title: "text",
  authorName: "text",
  price: "number",
  publicationDate: "date",
};

interface CreateFromProps {
  genres: string[];
}

const CreateForm: React.FC<CreateFromProps> = ({ genres }) => {
  const router = useRouter();
  const [state, formAction] = useFormState(createBook, {
    message: "",
  });

  const { status, error, mutate, isLoading } = useMutation(createBookMutation, {
    onSuccess: () => {
      // Optional: Handle success case
    },
    onError: (error: Error) => {
      // Optional: Handle error case
      console.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateBookSchema>({ resolver: zodResolver(createBookSchema) });
  const formRef = useRef<HTMLFormElement>(null);

  const [genre, setGenre] = useState<string>(genres[0] || "");

  if (state.message.includes(BookAppendedMsg)) {
    router.refresh();
    router.push(`/books/${genre}`);
  }

  return (
    <form
      action={formAction}
      onSubmit={async (evt) => {
        evt.preventDefault();

        const formData = formRef.current?.value;
        debugger;
        // Check if the formData includes the genre, if not, set the default genre
        if (formData && !formData.genre) {
          // formData.set("genre", genre);
          formData.genre = genre;
        }
        mutate(formData);
        // mutate(formRef.current?.value);

        // handleSubmit(() => {
        //   formAction(new FormData(formRef.current!));
        // })(evt);
      }}
      ref={formRef}
      className="create-form w-1/2"
    >
      {Object.entries(FormInputFieldsMap).map(
        ([k, v]: [string, string], i: number) => (
          <FormFieldWrapper
            key={k}
            heading={formatCamelCaseString(NewBookFields[k as NewBookFields])}
            errorMsg={errors[k as keyof CreateBookSchema]?.message ?? null}
          >
            <input type={v} {...register(k as keyof CreateBookSchema)} />
          </FormFieldWrapper>
        )
      )}

      <FormFieldWrapper
        heading={formatCamelCaseString(NewBookFields.description)}
        errorMsg={
          errors[NewBookFields.description as keyof CreateBookSchema]
            ?.message ?? null
        }
      >
        <textarea {...register(NewBookFields.description)} />
      </FormFieldWrapper>

      <FormFieldWrapper
        heading={formatCamelCaseString(NewBookFields.genre)}
        errorMsg={
          errors[NewBookFields.genre as keyof CreateBookSchema]?.message ?? null
        }
      >
        <select
          {...register(NewBookFields.genre as keyof CreateBookSchema)}
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        >
          {genres.map((genre: string, i: number) => (
            <option value={genre} key={i}>
              {formatCamelCaseString(genre)}
            </option>
          ))}
        </select>
      </FormFieldWrapper>

      <FormSubmitButton txt="Add a book" />

      {state?.message && (
        <p className="text-red-500 mt-4 font-bold">{state?.message}</p>
      )}
      {status && <p className="text-red-500 mt-4 font-bold">{status}</p>}
      {error?.message && (
        <p className="text-red-500 mt-4 font-bold">{error.message}</p>
      )}
      {isLoading && <p className="text-red-500 mt-4 font-bold">...Loading!!</p>}
    </form>
  );
};

export default CreateForm;
