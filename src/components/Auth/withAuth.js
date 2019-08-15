import React, { Component } from 'react';
// como el export no es con default, para el import utilizamos los {}
import {AuthContext} from '../../contexts/auth-context'

const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {/* Desde el Context Consumer desestructuramos los elementos que recibimos como value del Context Provider */}
          {({isLoggedIn, login, logout, signup, user}) => (
            <Comp 
            isLoggedIn={isLoggedIn}
            login={login}
            logout={logout}
            signup={signup}
            user={user}
            // Si no hacemos el spread de props, el componente solo recibirá las props del hoc (high order component) en y las props del componente no se pasarán
            {...this.props}
          />
          )}
        </AuthContext.Consumer>
      )
    }
  }
}

export default withAuth;