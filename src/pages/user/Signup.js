import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';
import SignupForm from '../../components/Forms/user/SignupForm';
import Logo from '../../components/Logo/Logo';

class Signup extends Component {

  state = {
    email: '',
    password: '',
    name: '',
    birthdate: '',
    city: '',
    language: 'EN',
  };

  doSignup = (values) => {
    const {email, password, name, birthdate, city, language} = values;

    this.props.signup({ email, password, name, birthdate, city, language })
      .then( (user) => {
        this.setState({
            email: '',
            password: '',
            name: '',
            birthdate: '',
            city: '',
            language: 'EN',
        });
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

        <SignupForm dosignup={this.doSignup}/>
        <p className='alternative'>Already have an account? <Link to={'/login'}> Login</Link></p>
        <p className='legal'>2109 © City Sounds. All rights reserved.</p>

      </div>
    )
  }
}

export default withAuth(Signup);