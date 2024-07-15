import React from 'react'

type ErrorDisplayProps = {
  isLoading: boolean
  isError: boolean
  isEmpty: boolean
}

const ErrorDisplay = ({ isLoading, isError, isEmpty }: ErrorDisplayProps) => {
  if (isLoading) {
    return <p>Loading...</p>
  } else if (isError) {
    return <p>Error</p>
  } else if (!isLoading && !isError && isEmpty) {
    return <p>Empty Form</p>
  }
}

export default ErrorDisplay
