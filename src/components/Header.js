import React from 'react'
import { Link } from "react-router-dom"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Input from "@material-ui/icons/Input";

const ns = 'header'

const Header = () => {

  const logOut = () => {
    localStorage.removeItem('JWT');
  }

  return (
    <AppBar className={`${ns}`}>
      <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
        <h2>CMS</h2>
        <Link to="/login" onClick={logOut}><Input /></Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header;