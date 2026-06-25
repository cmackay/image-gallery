'use client'

import { useEffect } from 'react'

// Remembers when we last forced a reload. If a fresh ChunkLoadError fires
// again within this window the reload clearly didn't fix it, so we stop and
// show the fallback UI instead of trapping the user in a reload loop. Using a
// short window (rather than a permanent flag) means a later deploy in the same
// long-lived tab still gets its own reload.
const RELOAD_FLAG = 'chunk-reload-attempted-at'
const RELOAD_LOOP_WINDOW_MS = 10_000

function isChunkLoadError(error: Error) {
  return (
    error.name === 'ChunkLoadError' ||
    /Loading chunk [^\s]+ failed/i.test(error.message) ||
    /Loading CSS chunk [^\s]+ failed/i.test(error.message)
  )
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (!isChunkLoadError(error)) {
      return
    }

    // After a new deploy the hashed chunk filenames change, so a chunk the
    // open tab tries to fetch (e.g. on a client-side navigation) 404s and
    // webpack throws ChunkLoadError. A full reload pulls the fresh build.
    // Guard against reload loops: if we already reloaded moments ago and the
    // chunk still fails to load, don't reload again.
    const lastAttempt = Number(sessionStorage.getItem(RELOAD_FLAG))
    if (lastAttempt && Date.now() - lastAttempt < RELOAD_LOOP_WINDOW_MS) {
      return
    }

    sessionStorage.setItem(RELOAD_FLAG, String(Date.now()))
    window.location.reload()
  }, [error])

  return (
    <html lang="en">
      <body className="antialiased">
        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
          <h1 className="text-3xl font-bold">Something went wrong</h1>
          <p className="text-gray-600">
            {isChunkLoadError(error)
              ? 'The app was just updated. Reloading to get the latest version…'
              : 'An unexpected error occurred. Please try again.'}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded bg-blue-400 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
