import clsx from 'clsx'
import { UseFormRegisterReturn } from 'react-hook-form'

import { FormFieldWrapper, FormFieldWrapperPassThroughProps } from './FormFieldWrapper'
import classes from './FormSelectField.module.scss'

export type FormSelectFieldOptions = {
  label: string;
  value: string | number;
}

type FormSelectFieldProps = FormFieldWrapperPassThroughProps & {
  options: FormSelectFieldOptions[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  registration?: Partial<UseFormRegisterReturn>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const FormSelectField = (props: FormSelectFieldProps) => {
  const { label, options, error, className, defaultValue, registration, placeholder, onChange } = props
  return (
    <FormFieldWrapper label={label} error={error}>
      <select
        placeholder={placeholder}
        className={clsx(classes.select, { [classes.error]:error?.message }, className)}
        defaultValue={defaultValue}
        onChange={onChange}
        {...registration}
      >
        {options.map(({ label, value }) => (
          <option key={label?.toString() ?? value.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FormFieldWrapper>
  )
}