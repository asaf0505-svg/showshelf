// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import LoadingCards from './LoadingCards'

afterEach(cleanup)

it('renders the requested number of loading cards with a status message', () => {
  const { container } = render(<LoadingCards count={3} message="Loading shows…" />)

  expect(screen.getByRole('status').textContent).toBe('Loading shows…')
  expect(container.querySelectorAll('.skeleton-card')).toHaveLength(3)
})
