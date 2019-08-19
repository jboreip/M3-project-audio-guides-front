import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';
import TripNewForm from '../../components/Forms/user/TripNewForm';
import tripsService from '../../services/trips-service';


// ya no necesitamos el service, ya que los métodos (login, logout, etc.) los hemos pasado con el withAuth como props
// import auth from '../services/auth-service';

class NewTrip extends Component {
  state = {
    city: '',
    location: '',
    img: '',
    fromDate: '',
    toDate: ''
  }

  createNewTrip = (values) => {
    const { city, location, img, fromDate, toDate } = values;
    const currentUser = this.props.user._id
    tripsService.newTrip({ city, location, img, fromDate, toDate }, currentUser)
    .then((data) => {
      console.log(this.props)
        this.props.user.trips = data.trips;
        this.props.history.push('/trips');
      })
    .catch(error => console.log(error) )
    // ahora en lugar de llamar a auth.login, cogemos el login the this.props
    // auth.login({ email, password })
    // .this.props.login({ email, password })
    // .then( (user) => {
    //   this.props.history.push('/discover');
    // })
    // .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    // const { email, password } = this.state;
    return (
      <React.Fragment>
        {/* <form onSubmit={this.handleFormSubmit}>
          <label htmlFor='email' >Email:</label>
          <input id='email' type='email' name='email' value={email} onChange={this.handleChange}/>
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' name='password' value={password} onChange={this.handleChange} />
          <input type='submit' value='Login' />
        </form> */}
        <TripNewForm createNewTrip={this.createNewTrip}/>
      </ React.Fragment>
    )
  }
}

export default withAuth(NewTrip);