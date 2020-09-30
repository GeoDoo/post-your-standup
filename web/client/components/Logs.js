import React from 'react'
import { useQuery, gql } from '@apollo/client'

const LOGS = gql`
  {
    errors {
      timestamp
      error {
        name
        message
        stack
      }
    }
  }
`

const Logs = () => {
  const { loading, error, data } = useQuery(LOGS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <ul className="logs">
      {data.errors.map(({ timestamp, error }) => (
        <li key={timestamp}>
          <p>{error.name}</p>
          <p>{error.message}</p>
          <p>{error.stack}</p>
        </li>
      ))}
    </ul>
  )
}

export default Logs
