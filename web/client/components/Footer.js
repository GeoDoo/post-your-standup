import React from 'react'

import AddToSlack from '../components/AddToSlack'

import './Footer.pcss'

const Footer = () => {
  return (
    <footer className="footer">
      <h2>Ready to get started?</h2>
      <AddToSlack />
      <div className="copyright">
        <p>Copyright © {new Date().getFullYear()}</p>
        <p>
          Created with ❤️ by <a href="https://github.com/GeoDoo">geodoo</a> and{' '}
          <a href="https://github.com/elefher">elefher</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
