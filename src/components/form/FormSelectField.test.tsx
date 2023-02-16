import { vi } from 'vitest'

import { FormSelectField } from './FormSelectField'

import { render, userEvent } from '@/test'

describe('FormSelectField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FormSelectField
        label="Label"
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
        registration={{ name: 'test' }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
  it('should render error', () => {
    const { getByText } = render(
      <FormSelectField
        label="Label"
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
        error={{ message: 'Error', type: 'test' }}
        registration={{ name: 'test' }}
      />
    )
    expect(getByText('Error')).toBeTruthy()
  })
  it('should render placeholder', () => {
    const { getByPlaceholderText } = render(
      <FormSelectField
        label="Label"
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
        placeholder="Placeholder"
        registration={{ name: 'test' }}
      />
    )
    expect(getByPlaceholderText('Placeholder')).toBeTruthy()
  })
  it('should render defaultValue', () => {
    const { getByDisplayValue } = render(
      <FormSelectField
        label="Label"
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
        defaultValue="option1"
        registration={{ name: 'test' }}
      />
    )
    expect(getByDisplayValue('Option 1')).toBeTruthy()
  })
  it('should render className', () => {
    const { getByRole } = render(
      <FormSelectField
        label="Label"
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
        className="test"
        registration={{ name: 'test' }}
      />
    )
    expect(getByRole('combobox')).toHaveClass('test')
  })
  it('should render onChange', async () => {
    const onChange = vi.fn()
    const { getByRole } = render(
      <FormSelectField
        label="Label"
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
        onChange={onChange}
        registration={{ name: 'test' }}
      />
    )
    const select = getByRole('combobox') as HTMLSelectElement
    await userEvent.click(select)
    await userEvent.selectOptions(select, 'option2')
    await userEvent.tab()
    expect(onChange).toHaveBeenCalled()
  })
})