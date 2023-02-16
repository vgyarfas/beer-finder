import { useParams } from 'react-router-dom'
import { vi } from 'vitest'

import {BeerPage} from './BeerPage'

import { render, waitFor } from '@/test'

vi.mock('react-router-dom')

vi.mocked(useParams).mockReturnValue({ beerId: '123' })

describe('BeerPage', () => {
  it('should load, render and display the beer details', async () => {
    const { getByText, getAllByRole } = render(<BeerPage />)
    expect(getByText('Loading...')).toBeTruthy()
    await waitFor(() => {
      expect(getAllByRole('heading')).toBeTruthy()
    })
  })
})