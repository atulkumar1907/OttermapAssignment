import React from 'react'

export default function Header({children}) {
  return (
    <div>
      <header className="d-flex justify-content-center pt-3 fw-bold fs-2">
        <p>{children}</p>
    </header>
    </div>
  )
}
