import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux"

function Navbar() {
  const users = useSelector(s=> s.users.value)
  return (
    <div className='navbar'>
        <h2>Redux Toolkit</h2>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/create-user"}>Create user</NavLink>
        <NavLink to={"/all-users"}>All users <sup>{users.length}</sup></NavLink>
    </div>
  )
}

export default Navbar