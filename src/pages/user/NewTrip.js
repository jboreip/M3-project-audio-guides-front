import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';
import TripNewForm from '../../components/Forms/user/TripNewForm';
import tripsService from '../../services/trips-service';
import flickrService from '../../services/flickr-service';

// ya no necesitamos el service, ya que los métodos (login, logout, etc.) los hemos pasado con el withAuth como props
// import auth from '../services/auth-service';

class NewTrip extends Component {
  state = {
    city: '',
    country: '',
    location: [],
    img: '',
    fromDate: '',
    toDate: '',
    formDisabled:true,
  }

  getLocationFromMap = (city, country, newLocation, formDisabled) => {
    this.setState({
      city,
      country,
      location: newLocation,
      formDisabled: formDisabled
    })
  }



  createNewTrip = (values) => {
    const { fromDate, toDate } = values;
    const { city, country, location } = this.state;
    flickrService.getCityImage(location[0],location[1])
    .then((photo) => {
      const {id, farm, server, secret } = photo;
      const cityImage = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`
      this.setState({
        img: cityImage
      })
    })
    .then(() => {
      const { img } = this.state;
      tripsService.newTrip({ city, country, location, img, fromDate, toDate })
      .then((data) => {
          this.props.user.trips = data.trips;
          this.props.history.push('/trips');
        })
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
        {/* <div className='trip-map'><TripMap getCoordsFromMap={this.getCoordsFromMap}>{this.props.children}</TripMap></div> */}
        <TripNewForm createNewTrip={this.createNewTrip} getLocationFromMap={this.getLocationFromMap} formDisabled={this.state.formDisabled}/>
      </ React.Fragment>
    )
  }
}

export default withAuth(NewTrip);