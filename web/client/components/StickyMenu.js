import React, { useEffect, useState } from 'react'

import { capitalize } from '../utils/formatters'

import './StickyMenu.pcss'

const StickyMenu = () => {
  const [links, setLinks] = useState([])

  useEffect(() => {
    const ids = Array.from(document.getElementsByClassName('section')).map(
      el => el.id,
    )

    setLinks(ids)
  }, [])

  return (
    <nav id="sticky-navigation-menu">
      <ul>
        {links.map(link => {
          return (
            <li key={link}>
              <a href={`#${link}`}>{capitalize(link.split('-').join(' '))}</a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default StickyMenu
