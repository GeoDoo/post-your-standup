import React from 'react'
import { useQuery, gql } from '@apollo/client'

import Workspace from './Workspace'

import './Workspaces.pcss'

const WORKSPACES = gql`
  {
    workspaces {
      teamId
      domain
      project
    }
  }
`

const Workspaces = () => {
  const { loading, error, data } = useQuery(WORKSPACES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <ul className="workspaces">
      {data.workspaces.map(({ teamId, domain, project }) => (
        <li key={teamId}>
          <Workspace teamId={teamId} domain={domain} project={project} />
        </li>
      ))}
    </ul>
  )
}

export default Workspaces
