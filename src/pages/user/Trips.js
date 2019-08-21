import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';
// import spotsService from '../../services/spots-service';
import tripsService from '../../services/trips-service';
// import mapboxService from '../../services/mapbox-service';
import withCoordinates from '../../components/Location/withCoordinates';


class Trips extends Component {

  state = {
    trips: [],
  }

  componentDidMount(){
  // trips del usuario
  tripsService.getUserTrips()
  .then(response => {
    this.setState({
      trips: response.listOfTrips.trips
    })
  })
  }


  render() {
    return (
      <section className='card-container'>
        <div className='header'>
        <p className='title'>Upcoming trips</p>
        <Link to={'/trips/new'} className='add-trip'>+</Link>
        </div>
        <section className='scroll-wrapper'>
        {this.state.trips.map((trip, i) => {
          return (
          <Link className='card' key={i} to={`/trips/${trip._id}`}>
          <img src={trip.img} alt={trip.city}/>
          <span>{trip.city}</span>
          {/* <p>{trip.toDate}</p>
          <p>{trip.fromDate}</p> */}
          </Link>
          )
        })}
        </section>
      </section>
    )
  }
}

export default withCoordinates(withAuth(Trips));