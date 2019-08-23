import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';
import LoginForm from '../../components/Forms/user/LoginForm';
import Logo from '../../components/Logo/Logo';


class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  doLogin = (values) => {
    const { email, password } = values;
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
    return (
      <div className='log-sign-container'>
        <Logo className='logo-image' width='25vw' height='25vw' fill='#6d7bfa' stroke=''/>
        <h1 className='logo-text'><span>City</span><span>Sounds</span></h1>
        <LoginForm doLogin={this.doLogin}/>

        <p className='alternative'>Don't have an account yet? <Link to={'/signup'}>Signup</Link></p>
        <p className='legal'>2109 © City Sounds. All rights reserved.</p>
      </div>
    )
  }
}

export default withAuth(Login);