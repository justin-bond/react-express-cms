import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './utils/PrivateRoute'
import Admin from './pages/Admin'
import Login from './pages/Login'
import NoMatch from './pages/NoMatch'

const ns = 'app'

const App = () => {
  return (
    <Router location onUpdate={() => window.scrollTo(0, 0)}>
      <div className={`${ns}`}>
        <div className="page-wrapper">
          <Switch>
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/admin" component={Admin} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
