import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import routes from "../routes";

const ns = 'admin'

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const Admin = () => {
  return (
    <div className={`${ns}`}>
      <Header />
      <div style={{display:'flex',marginTop:'100px'}}>
        <Sidebar
          routes={routes}
        />
        <div>
          <div>{switchRoutes}</div>
        </div>
      </div>
    </div>
  )
}

export default Admin;