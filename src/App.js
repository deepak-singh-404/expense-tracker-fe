import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { userLoginHelper, userLogout } from './redux/actions/userAction'
import setAuthToken from './redux/helper/setAuthToken'
import store from './redux/store'

//Components && Page
import Nav from './components/Nav'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AddTransaction from './pages/AddTransactions';



 

if (window.localStorage.userToken) {
  setAuthToken(localStorage.userToken);
  const decoded = jwt_decode(localStorage.userToken);
  store.dispatch(userLoginHelper(decoded))
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(userLogout());
    window.location.href = '/';
  }
}




function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/sign-up' component={RegisterPage} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/add-transaction' component={AddTransaction} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
