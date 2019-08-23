import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';
import tripsService from '../../services/trips-service';
import withCoordinates from '../../components/Location/withCoordinates';
import moment from 'moment';


class Trips extends Component {

  
  state = {
    trips: [],
  }

  componentDidMount(){
  tripsService.getUserTrips()
  .then(response => {
    response.listOfTrips.trips.sort(function(a, b) {
      a = new Date(a.fromDate);
      b = new Date(b.fromDate);
      return a>b ? 1 : a<b ? -1 : 0;
    });
    this.setState({
      trips: response.listOfTrips.trips
    })
  })
  }



  render() {
    const { trips } = this.state;

    return (
      <>
      <header className='header-trips'>
        <h1>Trips</h1>
      </header>
      <section className='card-container'>
        <div className='header'>
        <p className='title'>Upcoming trips</p>
        <Link to={'/trips/new'} className='add-trip'><img src='/images/add-new-full.svg' alt='Add new trip'/></Link>
        </div>
        {trips.length > 0
        ? 
        <section className='scroll-wrapper'>
        {this.state.trips.map((trip, i) => {
          const daysLeft = -(moment({hours: 0}).diff(trip.fromDate, 'days'))
          return (
          <Link className='card' key={i} to={`/trips/${trip._id}`}>
          <img src={trip.img} alt={trip.city}/>
          <span className='title'>{trip.city}</span>
          <span className='days-left'>{daysLeft} {daysLeft === 1 ? 'day' : 'days'} left</span>
          
          </Link>
          )
        })}
        </section>
        : 
        <Link to={'/trips/new'} className='scroll-wrapper'>
          <div className='empty-card'>
            <img src='/images/add-new.svg' alt='Add new trip' />
            <span className='title' style={{'color':'#6d7bfa'}}>Add new trip</span>
          </div>
        </Link>
        }
      </section>
      </>
    )
  }
}

export default withCoordinates(withAuth(Trips));