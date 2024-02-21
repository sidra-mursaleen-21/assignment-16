import React from 'react'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
      <div className="layoutContainer">
        <Outlet/>
      </div>
    </>
  )
}

export default Layout
