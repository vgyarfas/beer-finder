import { vi } from 'vitest'

import { FormInputField } from './FormInputField'

import { render, userEvent } from '@/test'

describe('FormInputField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormInputField label="Test" registration={{ name: 'test' }} />)
    expect(baseElement).toBeTruthy()
  })
  it('should render label', () => {
    const { getByText } = render(<FormInputField label="Test" registration={{ name: 'test' }} />)
    expect(getByText('Test')).toBeTruthy()
  })
  it('should render error', () => {
    const { getByText } = render(<FormInputField label="Test" error={{ message: 'Error', type: 'test' }} registration={{ name: 'test' }} />)
    expect(getByText('Error')).toBeTruthy()
  })
  it('should render type', () => {
    const { getByRole } = render(<FormInputField label="Test" type="email" registration={{ name: 'test' }} />)
    expect(getByRole('textbox')).toHaveAttribute('type', 'email')
  })
  it('should render className', () => {
    const { getByRole } = render(<FormInputField label="Test" className="test" registration={{ name: 'test' }} />)
    expect(getByRole('textbox')).toHaveClass('test')
  })
  it('should render placeholder', () => {
    const { getByPlaceholderText } = render(<FormInputField label="Test" placeholder="Placeholder" registration={{ name: 'test' }} />)
    expect(getByPlaceholderText('Placeholder')).toBeTruthy()
  })
  it('should render defaultValue', () => {
    const { getByDisplayValue } = render(<FormInputField label="Test" defaultValue="Default" registration={{ name: 'test' }} />)
    expect(getByDisplayValue('Default')).toBeTruthy()
  })
  it('should render onChange', async () => {
    const onChange = vi.fn()
    const { getByRole } = render(<FormInputField label="Test" onChange={onChange} registration={{ name: 'test' }} />)
    const input = getByRole('textbox') as HTMLInputElement
    await userEvent.click(input)
    await userEvent.type(input, 'Test')
    await userEvent.tab()
    expect(onChange).toHaveBeenCalled()
  })
})