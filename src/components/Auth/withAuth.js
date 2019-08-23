import React, { Component } from 'react';
import {AuthContext} from '../../contexts/auth-context'

const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({isLoggedIn, login, logout, signup, me, user}) => (
            <Comp 
            isLoggedIn={isLoggedIn}
            login={login}
            logout={logout}
            signup={signup}
            user={user}
            me={me}
            {...this.props}
          />
          )}
        </AuthContext.Consumer>
      )
    }
  }
}

export default withAuth;