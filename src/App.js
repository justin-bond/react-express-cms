import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './utils/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Login from './pages/Login'

const ns = 'app'

const App = () => {
  return (
    <Router location onUpdate={() => window.scrollTo(0, 0)}>
      <div className={`${ns}`}>
        <div className="page-wrapper">
          <Header />
          <Switch>
            <Route path="/login" exact component={Login} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route component={() => {
              return (
                <div>404</div>
              )
            }} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
