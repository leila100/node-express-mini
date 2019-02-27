import React from "react"
import { NavLink } from "react-router-dom"

import { NavbarWrapper, AppIcon, Links } from "../styles/navbarStyles"

const Navbar = () => {
  return (
    <NavbarWrapper>
      <AppIcon>
        <i className="fas fa-users" />
        <span>Users App</span>
      </AppIcon>
      <Links>
        <NavLink to="/">Users</NavLink>
        <NavLink to="/">Add User</NavLink>
      </Links>
    </NavbarWrapper>
  )
}

export default Navbar
