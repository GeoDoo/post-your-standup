import React from 'react'

import AddToSlack from '../components/AddToSlack'

const Intro = () => {
  return (
    <div id="intro" className="section">
      <div className="left">
        <h1>Post Your Standup</h1>
        <div className="pitch">
          <p>Add Post Your Standup to your workspace,</p>
          <p> paste your standup statement directly in,</p>
          <p>and start arguing about it,</p>
          <p>with no hassle at all!</p>
        </div>
        <AddToSlack />
      </div>
    </div>
  )
}

export default Intro
