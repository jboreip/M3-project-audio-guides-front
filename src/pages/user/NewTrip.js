import React, { Component } from 'react';
import withAuth from '../../components/Auth/withAuth';
import TripNewForm from '../../components/Forms/user/TripNewForm';
import tripsService from '../../services/trips-service';
import flickrService from '../../services/flickr-service';

class NewTrip extends Component {
  state = {
    city: '',
    country: '',
    location: [],
    img: '',
    fromDate: '',
    toDate: '',
    formDisabled:true,
    customError: null,
  }

  getLocationFromMap = (city, country, newLocation, formDisabled) => {
    this.setState({
      city,
      country,
      location: newLocation,
      formDisabled: formDisabled,
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
        .catch(error => {
          this.setState({
            customError: error.response.status,
        })
    })
    .catch(error => console.error(error) )
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <React.Fragment>
        <TripNewForm createNewTrip={this.createNewTrip} getLocationFromMap={this.getLocationFromMap} formDisabled={this.state.formDisabled} customError={this.state.customError}/>
      </ React.Fragment>
    )
  }
}

export default withAuth(NewTrip);