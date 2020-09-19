import React from 'react'

import Workspaces from '../components/Workspaces'
import withAuth from '../hocs/withAuth'

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Workspaces />
    </div>
  )
}

export default withAuth(Dashboard)
