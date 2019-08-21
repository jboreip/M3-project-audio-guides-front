import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';
import LoginForm from '../../components/Forms/user/LoginForm';
import Logo from '../../components/Logo/Logo';

// ya no necesitamos el service, ya que los métodos (login, logout, etc.) los hemos pasado con el withAuth como props
// import auth from '../services/auth-service';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  doLogin = (values) => {
    const { email, password } = values;
    // ahora en lugar de llamar a auth.login, cogemos el login the this.props
    // auth.login({ email, password })
    this.props.login({ email, password })
    .then( (user) => {
      this.props.history.push('/discover');
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    // const { email, password } = this.state;
    return (
      <div className='log-sign-container'>
        {/* <form onSubmit={this.handleFormSubmit}>
          <label htmlFor='email' >Email:</label>
          <input id='email' type='email' name='email' value={email} onChange={this.handleChange}/>
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' name='password' value={password} onChange={this.handleChange} />
          <input type='submit' value='Login' />
        </form> */}
        <Logo className='logo-image' width='25vw' height='25vw' fill='#6d7bfa' stroke=''/>
        <h1 className='logo-text'><span>City</span><span>Sounds</span></h1>
        <LoginForm doLogin={this.doLogin}/>

        <p className='alternative'>Don't have an accout yet? <Link to={'/signup'}>Signup</Link></p>
        <p className='legal'>2109 © City Sounds. All rights reserved.</p>
      </div>
    )
  }
}

export default withAuth(Login);