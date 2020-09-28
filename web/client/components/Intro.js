import React from 'react'

import AddToSlack from '../components/AddToSlack'

const Intro = () => {
  return (
    <div id="introduction" className="section">
      <div className="half">
        <h1>Post Your Standup</h1>
        <div className="pitch">
          <p>
            Add Post Your Standup to your workspace, paste your standup
            statement directly in,and start arguing about it, with no hassle at
            all!
          </p>
        </div>
        <AddToSlack />
      </div>
    </div>
  )
}

export default Intro
