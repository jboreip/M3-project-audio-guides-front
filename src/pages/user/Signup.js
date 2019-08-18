import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';
import SignupForm from '../../components/Forms/user/SignupForm';

// import auth from '../services/auth-service';

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
    // event.preventDefault();
    console.log(values)
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
    // const {email, password, name, birthdate, city, language} = this.state
    return (
      <React.Fragment>
        {/* <form onSubmit={this.handleFormSubmit}>
          <label htmlFor='email'>Email:</label>
          <input id='email' type='email' name='email' value={email} onChange={this.handleChange}/>
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' name='password' value={password} onChange={this.handleChange} />
          <label htmlFor='name'>Name:</label>
          <input id='name' type='text' name='name' value={name} onChange={this.handleChange} />
          <label htmlFor='birthdate'>Birthdate:</label>
          <input id='birthdate' type='date' name='birthdate' value={birthdate} onChange={this.handleChange} />
          <label htmlFor='city'>City:</label>
          <input id='city' type='text' name='city' value={city} onChange={this.handleChange} />
          <label htmlFor='language'>Language:</label>
          <select id='language' name='language' value={language} onChange={this.handleChange}>
            <option value='EN'>EN</option> 
            <option value='ES'>ES</option> 
          </select>
          <input type='submit' value='Signup' />
        </form> */}

        <SignupForm dosignup={this.doSignup}/>
        <p>Already have an account? 
          <Link to={'/login'}> Login</Link>
        </p>
      </React.Fragment>
    )
  }
}

export default withAuth(Signup);