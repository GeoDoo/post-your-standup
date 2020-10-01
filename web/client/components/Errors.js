import React from 'react'
import moment from 'moment'
import { useQuery, gql } from '@apollo/client'

import './Errors.pcss'

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

const Errors = () => {
  const { loading, error, data } = useQuery(LOGS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <ul className="logs">
      {data.errors
        .map(({ timestamp, error }) => (
          <li key={timestamp} className="log">
            <h4>{`${moment(timestamp).toDate()}`}</h4>
            <p>
              <span className="label">TYPE: </span>
              {error.name}
            </p>
            <p>
              <span className="label">MESSAGE: </span>
              {error.message}
            </p>
            <p>
              <span className="label">STACKTRACE: </span>
              {error.stack}
            </p>
          </li>
        ))
        .sort((a, b) => a.timestamp - b.timestamp)}
    </ul>
  )
}

export default Errors
