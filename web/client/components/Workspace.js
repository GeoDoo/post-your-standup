import React from 'react'
import PropTypes from 'prop-types'

const Workspace = ({ teamId, domain, project }) => {
  return (
    <div className="workspace">
      <p>Team ID: {teamId}</p>
      <p>Domain: {domain}</p>
      <p>Project: {project}</p>
    </div>
  )
}

Workspace.propTypes = {
  teamId: PropTypes.string,
  domain: PropTypes.string,
  project: PropTypes.string,
}

export default Workspace
