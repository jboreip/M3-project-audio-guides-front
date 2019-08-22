import React, { Component } from 'react'
import withAuth from '../../components/Auth/withAuth';
import tripsService from '../../services/trips-service.js'
import Loading from '../Loading/Loading';
import TripSpots from '../Trips/TripSpots';
import Backbar from '../Navigation/Backbar'
import Moment from 'react-moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class TripDetails extends Component {
  
  state = {
    trip: {}
  }
  
  componentDidMount(){
    const {id} = this.props.match.params;
    tripsService.getTrip(id)
    .then((trip) => {
      this.setState({
        trip,
      })
    })
    .catch((e) => {
      console.error(e) 
    })
  }

  deleteConfirm = (id) => {
    confirmAlert({
      title: 'Are you sure?',
      message: 'You are about to delete this trip.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteTrip(id)
        },
        {
          label: 'No',
          onClick: () => null
        }
      ]
    });
  }

  deleteTrip = (id) => {
    tripsService.deleteTrip(id)
    .then((response) => {
      this.props.me();
      this.props.history.push('/trips');
    })
  }

  render() {
    const { trip } = this.state;

    if(trip){
      const { city, fromDate, toDate, _id } = this.state.trip;
        return (
        <section className='trip-container'>
          <Backbar history={this.props.history}/>
          <header>
          <div>
          <h2>{city}</h2>
          <p><Moment format="DD/MM">{fromDate}</Moment> – <Moment format="DD/MM/YYYY">{toDate}</Moment></p>
          </div>
          <span onClick={() => {this.deleteConfirm(_id)}}><img src='/images/delete.svg' alt='delete-trip'/></span>
          </header>
          {/* <img src={img} alt={name}/> */}
          <section className='pad-container'>
          <TripSpots currentTrip={this.state.trip}/>
          </section>
        </section>
        )
      }else{
        return (
          <Loading/>
        )
      }
  }
}

export default withAuth(TripDetails);