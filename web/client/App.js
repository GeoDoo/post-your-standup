import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Frame from './components/Frame'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'

import './App.pcss'

const App = () => {
  return (
    <>
      <div className="inner">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </div>
      <Frame />
    </>
  )
}

export default App
