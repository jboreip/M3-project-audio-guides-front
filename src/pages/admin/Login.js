import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../components/withAuth';


class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state

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
    const { email, password } = this.state;
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor='email' >Email:</label>
          <input id='email' type='email' name='email' value={email} onChange={this.handleChange}/>
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' name='password' value={password} onChange={this.handleChange} />
          <input type='submit' value='Login' />
        </form>

        <p>You don't have an accout yet?
            <Link to={'/signup'}> Signup</Link>
        </p>
      </>
    )
  }
}

export default withAuth(Login);