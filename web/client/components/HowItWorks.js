import React from 'react'

import installApp from '../assets/images/install.png'

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
            </div>
            <div className="half">
              <img src={installApp} />
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default HowItWorks
