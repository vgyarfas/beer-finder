import { vi } from 'vitest'

import { Button } from '../button/Button'

import { Form } from './Form'
import { FormInputField } from './FormInputField'

import { render, userEvent, waitFor } from '@/test/utils'

type TestFormData = {
  test: string;
};

const handleSubmit = vi.fn(() => 0)

describe('Form', () => {
  it('should render successfully', () => {
    vi.resetAllMocks()
    const { baseElement, getByRole } = render(
      <Form<TestFormData> onSubmit={handleSubmit} name="testForm">
        {({ register, formState }) => ( <>
          <FormInputField type="text" error={formState.errors.test} registration={register('test')} />
        </> )}
      </Form>
    )
    expect(baseElement).toBeTruthy()
    expect(getByRole('textbox')).toBeTruthy()
  })
  it('should render className', () => {
    vi.resetAllMocks()
    const { getByRole } = render(
      <Form<TestFormData> onSubmit={handleSubmit} className="test" name="testForm">
        {({ register, formState }) => ( <>
          <FormInputField type="text" error={formState.errors.test} registration={register('test')} />
        </> )}
      </Form>
    )
    expect(getByRole('form')).toHaveClass('test')
  })
  it('should submit a form', async () => {
    vi.resetAllMocks()
    const { getByRole } = render(
      <>
        <Form<TestFormData> onSubmit={handleSubmit} name="testForm" id="testForm">
          {({ register, formState }) => ( 
            <>
              <FormInputField type="text" error={formState.errors.test} registration={register('test', {
                required: {
                  value: true,
                  message: 'Please fill in this field.',
                }})} />
            </> 
          )} 
        </Form>
        <Button type="submit" form="testForm">
          Submit
        </Button>
      </>
    )
    const input = getByRole('textbox')
    const submitButton = getByRole('button')
    await userEvent.type(input, 'test')
    await userEvent.click(submitButton)
    await waitFor(() => expect(handleSubmit).toHaveBeenCalled())
  })
  it('should fail form validation', async () => {
    vi.resetAllMocks()
    const { getByRole, getByText } = render(
      <>
        <Form<TestFormData> onSubmit={handleSubmit} name="testForm" id="testForm">
          {({ register, formState }) => ( 
            <>
              <FormInputField type="text" error={formState.errors.test} registration={register('test', {
                required: {
                  value: true,
                  message: 'Please fill in this field.',
                }})} />
            </> 
          )}
        </Form>
        <Button type="submit" form="testForm">
        Submit
        </Button>
      </>
    )
    const submitButton = getByRole('button')
    await userEvent.click(submitButton)
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0))
    await waitFor(() => expect(getByText('Please fill in this field.')).toBeTruthy())
  })
})
