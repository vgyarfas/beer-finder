import { FormFieldWrapper } from './FormFieldWrapper'
import { FormInputField } from './FormInputField'

import { render } from '@/test/utils'

describe('FormFieldWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormFieldWrapper label="TestLabel"><input type="text"></input></FormFieldWrapper>)
    expect(baseElement).toBeTruthy()
  })
  it('should render label', () => {
    const { getByText } = render(<FormFieldWrapper label="TestLabel"><input type="text"></input></FormFieldWrapper>)
    expect(getByText('TestLabel')).toBeTruthy()
  })
  it('should render error', () => {
    const { getByText } = render(<FormFieldWrapper label="TestLabel" error={{ message: 'Error', type: 'test' }}><input type="text"></input></FormFieldWrapper>)
    expect(getByText('Error')).toBeTruthy()
  })
  it('should render children', () => {
    const { getByText } = render(<FormFieldWrapper label="TestLabel"><FormInputField registration={{ name: 'test' }} /></FormFieldWrapper>)
    expect(getByText('TestLabel')).toBeTruthy()
  })
  it('should render className', () => {
    const { getByTestId } = render(<FormFieldWrapper label="TestLabel" className="test"><input type="text"></input></FormFieldWrapper>)
    expect(getByTestId('labelContainer')).toHaveClass('test')
  }) 
})