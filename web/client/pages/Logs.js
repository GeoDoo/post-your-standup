import React from 'react'

import Errors from '../components/Errors'
import withAuth from '../hocs/withAuth'

const Logs = () => {
  return (
    <div>
      <h1>Logs</h1>
      <Errors />
    </div>
  )
}

export default withAuth(Logs)
