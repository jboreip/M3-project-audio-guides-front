import React, { Component } from 'react';
import { BrowserRouter as Router , Switch } from 'react-router-dom';

import Navbar from './components/Navigation/Navbar';
import Discover from './pages/user/Discover';
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import AuthProvider from './contexts/auth-context'
import PrivateRoute from './components/Routes/PrivateRoute';
import AnonRoute from './components/Routes/AnonRoute';

import './App.css';
import 'milligram';

class App extends Component {
  render () {
    return (
      <Router>
        <AuthProvider>
        <div className="container">
          <h1>Basic React Authentication</h1>
          <Navbar />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            {/* si queremos pasar un componente con props utilizamos render en lugar de component y dentro podemos añadir props */}
            {/* <PrivateRoute path="/private" render={() => (
              <Private test='test prop to pass'></Private>
            )} /> */}
            <PrivateRoute path="/discover" component={Discover} />
          </Switch>
        </div>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
