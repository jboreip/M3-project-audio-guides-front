import React, { Component } from 'react';
import authService from '../services/auth-service'

export const AuthContext = React.createContext();

class AuthProvider extends Component {

  state = {
    isLoggedIn: false,
    user: {},
    isLoading: true,
  }

  userSignup = (user) => {
    return authService.signup(user)
    .then(() => {
      this.setState({
        isLoggedIn: true,
        user 
      })
    })
  }

  userLogin = (user) => {
    return authService.login(user)
    .then((data) => {
      this.setState({
        isLoggedIn: true,
        user: data 
      })
    })
  }


  userLogout = () => {
    return authService.logout()
    .then(() => {
      this.setState({
        isLoggedIn: false,
        user: {}
      })
    })
  }

  componentDidMount(){
    authService.me()
    .then((user) => {
      this.setState({
        user,
        isLoggedIn: true,
        isLoading:false
      })
    })
    .catch(() => {
      this.setState({
        user: {},
        isLoggedIn: false,
        isLoading:false
      })
    })  
  }


  render() {
    const {user, isLoggedIn, isLoading} = this.state;
    return (
        <React.Fragment>
          {isLoading ? <p>Loading...</p>
          :
          <AuthContext.Provider value={{
            user,
            isLoggedIn,
            login: this.userLogin,
            signup: this.userSignup,
            logout: this.userLogout,
          }}>
            {this.props.children}
          </AuthContext.Provider>
          }
        </ React.Fragment>
    )
  }
}


export default AuthProvider;