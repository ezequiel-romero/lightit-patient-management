import { CSSProperties } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const override: CSSProperties = {
  display: 'block',
  margin: '50px auto',
  borderColor: 'var(--midnight-blue)',
}

export const Loader = () => {
  return <ClipLoader cssOverride={override} size={50} aria-label="Loading Spinner" />
}
