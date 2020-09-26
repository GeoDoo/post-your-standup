import React from 'react'

import withSidebar from '../hocs/withSidebar'

import Intro from '../components/Intro'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'

import StickyMenu from '../components/StickyMenu'

import ribbon from '../assets/images/forkme_right_orange_ff7600.svg'

import './Landing.pcss'
import './Page.pcss'

const Landing = () => {
  return (
    <div className="page">
      <a className="ribbon" href="https://github.com/GeoDoo/post-your-standup">
        <img src={ribbon} alt="Fork me on GitHub" />
      </a>
      <Intro />
      <HowItWorks />
      <Features />
    </div>
  )
}

export default withSidebar(Landing, StickyMenu)
