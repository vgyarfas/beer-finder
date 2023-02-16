import { useState } from 'react'

import { authWithYesNoApi } from '../api'
import { login } from '../stores'
import { YesNoApiAnswer } from '../types'

import classes from './LoginForm.module.scss'

import { Button } from '@/components/button/Button'
import { Form } from '@/components/form/Form'
import { FormInputField } from '@/components/form/FormInputField'
import { useAppDispatch } from '@/lib/react-redux'

type LoginFormData = {
  name: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [loading, setLoading] = useState(false)  
  const [serverError, setServerError] = useState('')

  const dispatch = useAppDispatch()

  const onSubmit = (data: LoginFormData) => {
    setLoading(true)
    setServerError('')
    authWithYesNoApi().then(response => {
      if (response === YesNoApiAnswer.Yes) {
        dispatch(login({ name: data.name }))
        onSuccess()
      } else {
        setServerError('Server said no. Try again.')
      }
    }).finally(() => { 
      setLoading(false)
    })
  }

  return (
    <div className={classes.container}>
      <Form<LoginFormData> id="login-form" name="login-form" onSubmit={onSubmit}>
        {({ register, formState }) => (
          <>
            <FormInputField
              label="Name"
              registration={register('name', {
                required: {
                  value: true,
                  message: 'Please fill in this field.',
                },
                maxLength: {
                  value: 50,
                  message: 'Please use maximum 50 characters.',
                },
              })}
              error={formState.errors.name}
            />
          </>
        )}
      </Form>
      {serverError && <p>{serverError}</p>}
      <div className={classes.buttonContainer}>
        <Button type="submit" form="login-form" isLoading={loading}>
        Log in
        </Button>
      </div>
      <p>There is a 50% chance of getting in (<a href="yesno.wtf/api" target="_blank">yesno.wtf/api</a>). If server responds with a no, just click Log in again.</p>
    </div>
  )
}
