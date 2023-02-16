import clsx from 'clsx'
import * as React from 'react'

import { Spinner } from '../spinner/Spinner'

import classes from './Button.module.scss'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      isLoading = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(classes.container, className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading && <Spinner size="lg" data-testid="spinner" className={classes.loadingSpinner} />}
        <span className="mx-2">{props.children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'
