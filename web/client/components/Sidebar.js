import React from 'react'
import PropTypes from 'prop-types'

import './Sidebar.pcss'

const Sidebar = ({ children }) => {
  return <aside className="sidebar">{children}</aside>
}

Sidebar.propTypes = {
  children: PropTypes.node,
}

export default Sidebar
