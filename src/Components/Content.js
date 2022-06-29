import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import Ranking from '../pages/Ranking';

class Content extends React.Component {
  render() {
    return (

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/Settings" component={ Settings } />
        <Route path="/Ranking" component={ Ranking } />
      </Switch>

    );
  }
}

export default Content;
