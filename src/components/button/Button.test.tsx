import { Button } from './Button'

import { render } from '@/test/utils'

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button>Primary Button</Button>)
    expect(baseElement).toBeTruthy()
  })
  it('should render loading spinner', () => {
    const { getByRole } = render(<Button isLoading>Primary Button</Button>)
    expect(getByRole('status')).toBeTruthy()
  })
  it('should render children', () => {
    const { getByText } = render(<Button>Primary Button</Button>)
    expect(getByText('Primary Button')).toBeTruthy()
  })
  it('should render disabled', () => {
    const { getByRole } = render(<Button disabled>Primary Button</Button>)
    expect(getByRole('button')).toBeDisabled()
  })
  it('should render type', () => {
    const { getByRole } = render(<Button type="submit">Primary Button</Button>)
    expect(getByRole('button')).toHaveAttribute('type', 'submit')
  })
  it('should render className', () => {
    const { getByRole } = render(<Button className="test">Primary Button</Button>)
    expect(getByRole('button')).toHaveClass('test')
  })
})
