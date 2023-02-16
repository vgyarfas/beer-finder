import { vi } from 'vitest'

import { LoginPage } from './LoginPage'

import { render, userEvent, waitFor } from '@/test'

const mockedUsedNavigate = vi.fn(() => 0)

vi.mock('react-router-dom', () => ({
  ...vi.importMock('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

describe('LoginPage', () => {
  it('should render successfully', () => {
    vi.resetAllMocks()
    const { baseElement } = render(<LoginPage />)
    expect(baseElement).toBeTruthy()
  })
  it('should fill in the name field of the form with a valid string then submit the form', async () => {
    vi.resetAllMocks()
    const { getByRole } = render(<LoginPage />)
    const input = getByRole('textbox')
    const submitButton = getByRole('button')
    await userEvent.type(input, 'test')
    await userEvent.click(submitButton)
    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith('/beers'))
  })
  it('should fail form validation (required)', async () => {
    vi.resetAllMocks()
    const { getByRole, getByText } = render(<LoginPage />)
    const submitButton = getByRole('button')
    await userEvent.click(submitButton)
    await expect(getByText('Please fill in this field.')).toBeTruthy()
  })
  it('should fail form validation (minLength)', async () => {
    vi.resetAllMocks()
    const { getByRole, getByText } = render(<LoginPage />)
    const input = getByRole('textbox')
    const submitButton = getByRole('button')
    await userEvent.type(input, '012345678901234567890123456789012345678901234567890123456789')
    await userEvent.click(submitButton)
    await expect(getByText('Please use maximum 50 characters.')).toBeTruthy()
  })
})