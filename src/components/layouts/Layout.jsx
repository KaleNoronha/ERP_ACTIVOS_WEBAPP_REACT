import React, { useState } from 'react'
import MainView from './MainView'
import SideNav from './SideNav'

export default function Layout() {
  const [activeSection, setActiveSection] = useState('')

  return (
    <div className="flex h-screen">
        <SideNav onSectionChange={setActiveSection} />
        <MainView activeSection={activeSection} />
    </div>
  )
}
