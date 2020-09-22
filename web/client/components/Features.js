import React from 'react'

import './Features.pcss'

const Features = () => {
  return (
    <div id="features" className="section">
      <h2 className="section-title">Features</h2>
      <ul className="features">
        <li>
          <div>
            <h3>Commands</h3>
            <p>
              With a simple command, you can check and post which tickets you
              are working on for any project within your company or
              organization.
            </p>
          </div>
        </li>
        <li>
          <div>
            <h3>Home page</h3>
            <p>
              On our app&apos;s Home page you can find some helpful information
              about the app, instructions on how to set it up and a connect to
              Jira button once and for all.
            </p>
          </div>
        </li>
        <li>
          <div>
            <h3>Hints and helpful messages</h3>
            <p>
              If you type something wrong or you missed something and the result
              you expected did not show up, do not worry! We got your back with
              our informative and insightful help messages.
            </p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Features
