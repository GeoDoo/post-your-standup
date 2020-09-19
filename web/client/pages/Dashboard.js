import React from 'react'

import Workspaces from '../components/Workspaces'
import UserMenu from '../components/UserMenu'
import withAuth from '../hocs/withAuth'

const Dashboard = () => {
  return (
    <div>
      <UserMenu />
      <h1>Dashboard</h1>
      <Workspaces />
    </div>
  )
}

export default withAuth(Dashboard)
