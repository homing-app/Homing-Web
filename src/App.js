import React, { Component } from 'react';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import HasHome from './components/home/HasHome';
import Main from './components/Main';
import UserProfile from './components/UserProfile';
import HomeSummary from './components/HomeSummary';
import Config from './components/Config';
import { Switch, Route, Redirect} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/register" component={ Register }/>
          <Route exact path="/login" component={ Login }/>
          <Route exact path="/" component={ Main }/>
          <Route exact path="/:id/details" component={ UserProfile }/>
          <Route exact path="/:id/hashome" component={ HasHome }/>
          <Route exact path="/:id/summary" component={ HomeSummary }/>
          <Route exact path="/config" component={ Config }/>
        </Switch>
      </div>
    );
  }
}

export default App;
