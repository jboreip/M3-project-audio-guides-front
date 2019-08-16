import React, { Component } from 'react';
import { BrowserRouter as Router , Switch } from 'react-router-dom';

import Splash from './pages/user/Splash';
import Navbar from './components/Navigation/Navbar';
import Discover from './pages/user/Discover';
import Trips from './pages/user/Trips';
import Profile from './pages/user/Profile';
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import AuthProvider from './contexts/auth-context'
import PrivateRoute from './components/Routes/PrivateRoute';
import AnonRoute from './components/Routes/AnonRoute';

import './App.css';
// import 'milligram';

class App extends Component {
  render () {
    return (
      <Router>
        <div className='container'>
        <AuthProvider>
        <div className='data-container'>
          <Switch>
            <AnonRoute exact path='/' component={Splash} />
            <AnonRoute path='/signup' component={Signup} />
            <AnonRoute path='/login' component={Login} />
            {/* si queremos pasar un componente con props utilizamos render en lugar de component y dentro podemos añadir props */}
            {/* <PrivateRoute path='/private' render={() => (
              <Private test='test prop to pass'></Private>
            )} /> */}
            <PrivateRoute path='/discover' component={Discover} />
            <PrivateRoute path='/trips' component={Trips} />
            <PrivateRoute path='/profile' component={Profile} />
          </Switch>
        </div>
        <Navbar />
        </AuthProvider>
        </div>
      </Router>
    );
  }
}

export default App;
