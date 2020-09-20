import React from 'react'

import Sidebar from '../components/Sidebar'

const withSidebar = (Component, SidebarContent) => {
  const WithSidebar = () => (
    <>
      <Component />
      <Sidebar>
        <SidebarContent />
      </Sidebar>
    </>
  )

  return WithSidebar
}

export default withSidebar
