import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import 'rsuite/dist/styles/rsuite.min.css'
import './style/style.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthStore } from './contexts/AuthStore'

ReactDOM.render(
<Router basename={process.env.PUBLIC_URL}>
  <AuthStore>
    <App />
  </AuthStore>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
