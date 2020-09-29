import React from 'react'

import installApp from '../assets/images/install.png'
import connectToJira from '../assets/images/connect-to-jira.png'
import postStandup from '../assets/images/post-standup.png'

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
              <p>
                Simply click on one of the Add to Slack buttons, then choose the
                channel you want to integrate it with, and finally the Allow
                button!
              </p>
            </div>
            <div className="half">
              <img src={installApp} />
            </div>
          </div>
        </li>
        <li>
          <div className="full reverse">
            <div className="half">
              <img src={connectToJira} />
            </div>
            <div className="half">
              <span className="step">#2</span>
              <h3>Connect to Jira</h3>
              <p>
                Fill in the appropriate fields, so the app can be authenticated
                to access your boards, and hop in to the channel you integrated
                the app!
              </p>
            </div>
          </div>
        </li>
        <li>
          <div className="full">
            <div className="half">
              <span className="step">#3</span>
              <h3>Post Your Standup on the channel</h3>
              <p>
                Type: <b>/standup your_Jira_email your_Jira_project</b>
                <br />
                We need your email to fetch all issues assigned to you, and your
                project key, meaning your tickets&rsquo; prefix. If you have a
                ticket SBE-123, then SBE is what you need to provide us.
              </p>
            </div>
            <div className="half">
              <img src={postStandup} />
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default HowItWorks
