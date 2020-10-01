import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Frame from './components/Frame'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Logs from './pages/Logs'

import './App.pcss'

const App = () => {
  return (
    <>
      <main>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/logs">
              <Logs />
            </Route>
          </Switch>
        </Router>
        <Footer />
      </main>
      <Frame />
    </>
  )
}

export default App
