import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import GlobalError from './global-error'

function chunkLoadError() {
  const error = new Error('Loading chunk e0e8b5cb6ba89bbf failed.')
  error.name = 'ChunkLoadError'
  return error
}

describe('GlobalError', () => {
  const reload = vi.fn()

  const originalLocation = window.location

  beforeEach(() => {
    sessionStorage.clear()
    reload.mockClear()
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, reload },
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    })
    vi.restoreAllMocks()
  })

  it('reloads the page on a ChunkLoadError to pick up the fresh build', () => {
    render(<GlobalError error={chunkLoadError()} reset={vi.fn()} />)
    expect(reload).toHaveBeenCalledTimes(1)
    expect(
      screen.getByText(/the app was just updated/i)
    ).toBeInTheDocument()
  })

  it('does not reload again right after a reload was already attempted', () => {
    sessionStorage.setItem('chunk-reload-attempted-at', String(Date.now()))
    render(<GlobalError error={chunkLoadError()} reset={vi.fn()} />)
    expect(reload).not.toHaveBeenCalled()
  })

  it('does not reload for a non-chunk error', () => {
    render(<GlobalError error={new Error('something else')} reset={vi.fn()} />)
    expect(reload).not.toHaveBeenCalled()
    expect(
      screen.getByText(/an unexpected error occurred/i)
    ).toBeInTheDocument()
  })
})
