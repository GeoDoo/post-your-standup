import React, { useEffect, useState } from 'react'
import config from '../../config'

const AddToSlack = () => {
  const [url, setUrl] = useState('')

  const getInstallUrlPath = async () => {
    try {
      const response = await fetch(
        `${config.prod.app}${config.prod.installUrlPath}`,
      )
      const { installUrl } = await response.json()

      setUrl(installUrl)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getInstallUrlPath()
  }, [])

  return url ? (
    <a href={url}>
      <img
        alt="Add to Slack"
        height="40"
        width="140"
        src="https://platform.slack-edge.com/img/add_to_slack.png"
        srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x,
        https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
      />
    </a>
  ) : null
}

export default AddToSlack
