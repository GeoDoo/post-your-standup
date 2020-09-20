import React from 'react'

import installApp from '../assets/images/install.png'
import connectToJira from '../assets/images/connect-to-jira.png'

import './HowItWorks.pcss'

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="section">
      <h2 className="section-title">How it works</h2>
      <ul>
        <li>
          <div className="full">
            <div className="half">
              <span className="step">#1</span>
              <h3>Install Post Your Standup to your workspace</h3>
              <p>Simply click on one of the Add to Slack buttons,</p>
              <p>then choose the channel you want to integrate it with,</p>
              <p>and finally the Allow button!</p>
            </div>
            <div className="half">
              <img src={installApp} />
            </div>
          </div>
        </li>
        <li>
          <div className="full">
            <div className="half">
              <img src={connectToJira} />
            </div>
            <div className="half">
              <span className="step">#2</span>
              <h3>Connect to Jira</h3>
              <p>Fill in the appropriate fields,</p>
              <p>so the app can be authenticated to access your boards,</p>
              <p>and hop in to the channel you integrated the app!</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default HowItWorks
