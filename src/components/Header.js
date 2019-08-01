import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const ns = 'header'

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('JWT')) {
      setLoggedIn(true)
    }
  }, [loggedIn])

  const logOut = () => {
    localStorage.removeItem('JWT');
    setLoggedIn(false)
  }

  return (
    <div className={`${ns}`}>
      <h2>CMS</h2>
      {
        loggedIn &&
        <Link to="/login" onClick={logOut}>Log out</Link>
      }
    </div>
  )
}

export default Header;