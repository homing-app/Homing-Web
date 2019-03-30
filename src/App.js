import React, { Component } from 'react';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import HasHome from './components/home/HasHome';
import Main from './components/Main';
import { Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/register" component={ Register }/>
          <Route exact path="/login" component={ Login }/>
          <Route exact path="/" component={ Main }/>
          <Route path="/:id/hashome" component={ HasHome }/>
        </Switch>
      </div>
    );
  }
}

export default App;
