import clsx from 'clsx'
import { UseFormRegisterReturn } from 'react-hook-form'

import { FormFieldWrapper, FormFieldWrapperPassThroughProps } from './FormFieldWrapper'
import classes from './FormInputField.module.scss'

type FormInputFieldProps = FormFieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  registration?: Partial<UseFormRegisterReturn>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInputField = (props: FormInputFieldProps) => {
  const { type = 'text', label, className, registration, error, placeholder, defaultValue, onChange } = props
  return (
    <FormFieldWrapper label={label} error={error}>
      <input
        type={type}
        className={clsx(classes.input, { [classes.error]:error?.message }, className)}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        {...registration}
      />
    </FormFieldWrapper>
  )
}