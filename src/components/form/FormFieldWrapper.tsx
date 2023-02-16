import clsx from 'clsx'
import * as React from 'react'
import { FieldError } from 'react-hook-form'

import classes from './FormFieldWrapper.module.scss'

type FormFieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
};

export type FormFieldWrapperPassThroughProps = Omit<FormFieldWrapperProps, 'className' | 'children'>;

export const FormFieldWrapper = (props: FormFieldWrapperProps) => {
  const { label, className, error, children } = props
  return (
    <div className={classes.container}>
      <label className={clsx(classes.label, className)} data-testid="labelContainer">
        <span>{label}</span>
        <div className={classes.childrenContainer}>{children}</div>
      </label>
      {error?.message && (
        <div role="alert" aria-label={error.message} className={classes.validationMessage}>
          {error.message}
        </div>
      )}
    </div>
  )
}