import React from 'react'

import './Features.pcss'

const Features = () => {
  return (
    <div id="features" className="section">
      <h2 className="section-title">Features</h2>
      <ul className="features">
        <li>
          <div>
            <h3>Immediate feedback</h3>
            <p>
              With a simple command, you can check and post your Jira tickets
              for any project within your company or organization.
            </p>
          </div>
        </li>
        <li>
          <div>
            <h3>Interactive setup</h3>
            <p>
              You can setup your connection with Jira effortlessly with our
              simple app Home page and our hints and tips on how to do it. We
              value a good user experience ourselves too.
            </p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Features
