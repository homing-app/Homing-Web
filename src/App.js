import React, { Component } from 'react';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import HasHome from './components/home/HasHome';
import { Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/register" component={ Register }/>
          <Route exact path="/login" component={ Login }/>
          <Route path="/:id/hashome" component={ HasHome }/>
        </Switch>
      </div>
    );
  }
}

export default App;
