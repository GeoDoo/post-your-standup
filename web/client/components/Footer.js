import React from 'react'

import AddToSlack from '../components/AddToSlack'

import './Footer.pcss'

const Footer = () => {
  return (
    <footer className="footer">
      <h2>Ready to get started?</h2>
      <AddToSlack />
    </footer>
  )
}

export default Footer
