import { vi } from 'vitest'

import { BeersPage } from './BeersPage'

import { render, userEvent, waitFor } from '@/test'

const mockedUsedNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  ...vi.importMock('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

describe('BeersPage', () => {
  it('should load, render and displays 50 items', async () => {
    vi.resetAllMocks()
    const { getAllByRole, getAllByText } = render(<BeersPage />)
    const loadingMessages = getAllByText('Loading')
    expect(loadingMessages[0]).toBeInTheDocument()
    await waitFor(() => {
      expect(getAllByRole('listitem')).toHaveLength(50)
    })
  })
  it('should load, render and display 50 items, after clicking on the next page button', async () => {
    vi.resetAllMocks()
    const { getAllByRole, getAllByText, getByText } = render(<BeersPage />)
    const loadingMessages = getAllByText('Loading')
    expect(loadingMessages[0]).toBeInTheDocument()
    await waitFor(() => {
      expect(getAllByRole('listitem')).toHaveLength(50)
    }
    )
    await userEvent.click(getByText('Next page'))
    await waitFor(() => {
      expect(getAllByRole('listitem')).toHaveLength(50)
    })
  })
  it('should load, render and display 50 items, after clicking on the next page button, then on the previous page button', async () => {
    vi.resetAllMocks()
    const { getAllByRole, getAllByText, getByText } = render(<BeersPage />)
    const loadingMessages = getAllByText('Loading')
    expect(loadingMessages[0]).toBeInTheDocument()
    await waitFor(() => {
      expect(getAllByRole('listitem')).toHaveLength(50)
    })
    await userEvent.click(getByText('Next page'))
    await waitFor(() => {
      expect(getAllByRole('listitem')).toHaveLength(50)
    })
    await userEvent.click(getByText('Previous page'))
    await waitFor(() => {
      expect(getAllByRole('listitem')).toHaveLength(50)
    })
  })
  it('should load and render, then display 25 items after setting the per page select box to 25', async () => {
    vi.resetAllMocks()
    const { getAllByRole, getAllByText, getByRole } = render(<BeersPage />)
    const loadingMessages = getAllByText('Loading')
    expect(loadingMessages[0]).toBeInTheDocument()
    await waitFor(() => {
      expect(getAllByRole('listitem')).toHaveLength(50)
    })
    await userEvent.selectOptions(getByRole('combobox'), '25')
    await waitFor(() => {
      expect(getAllByRole('listitem')).toHaveLength(25)
    })
  })
  it('should navigate after clicking on a beer', async () => {
    vi.resetAllMocks()
    const { getAllByRole, getAllByText } = render(<BeersPage />)
    const loadingMessages = getAllByText('Loading')
    expect(loadingMessages[0]).toBeInTheDocument()
    await waitFor(() => {
      expect(getAllByRole('listitem')).toHaveLength(50)
    })
    await userEvent.click(getAllByRole('listitem')[0])
    expect(mockedUsedNavigate).toHaveBeenCalledWith('0')
  })
})
