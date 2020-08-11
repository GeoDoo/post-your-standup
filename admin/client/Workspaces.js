import React from 'react'
import { useQuery, gql } from '@apollo/client'

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

  return data.workspaces.map(({ teamId, domain, project }) => (
    <div key={teamId}>
      <p>Team ID: {teamId}</p>
      <p>Domain: {domain}</p>
      <p>Project: {project}</p>
    </div>
  ))
}

export default Workspaces
