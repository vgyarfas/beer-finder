import { Spinner } from './Spinner'
import classes from './Spinner.module.scss'

import { render } from '@/test/utils'

describe('Spinner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Spinner />)
    expect(baseElement).toBeTruthy()
  })
  it('should render size', () => {
    const { getByRole } = render(<Spinner size="lg" />)
    expect(getByRole('status')).toHaveClass(classes.sizeLg)
  })
  it('should render className', () => {
    const { getByRole } = render(<Spinner className="test" />)
    expect(getByRole('status')).toHaveClass('test')
  })
})
