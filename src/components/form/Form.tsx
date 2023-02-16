import clsx from 'clsx'
import * as React from 'react'
import { useForm, UseFormReturn, SubmitHandler, UseFormProps, FieldValues } from 'react-hook-form'

type FormProps<TFormValues extends FieldValues> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  name: string;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
>({
    onSubmit,
    children,
    className,
    options,
    id,
    name
  }: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>(options)
  return (
    <form
      className={clsx(className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
      name={name}
    >
      {children(methods)}
    </form>
  )
}