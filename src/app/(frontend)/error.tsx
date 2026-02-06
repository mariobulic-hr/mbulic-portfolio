'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="page-container container">
      <h1>Something went wrong</h1>
      <p>An unexpected error occurred. Please try again.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
