import React from 'react'

import Workspaces from './Workspaces'
import UserMenu from './components/UserMenu'
import withAuth from './hocs/withAuth'

import './App.pcss'

const App = () => {
  return (
    <div>
      <UserMenu />
      <h1>Dashboard</h1>
      <Workspaces />
    </div>
  )
}

export default withAuth(App)
