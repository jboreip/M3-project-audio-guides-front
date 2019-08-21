import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';
import spotsService from '../../services/spots-service';


class TripSpots extends Component {

  state = {
    spots: [],
    userSpots: this.props.user.spots,
  }

  componentDidMount(){
  spotsService.getSpots()
  .then(response => {
    this.setState({
      spots: response.listOfSpots
    })
  })
  }


  render() {
    const {spots, trip, userSpots} = this.state;
    const {currentTrip} = this.props;
    console.log(currentTrip)
    return (
      <section className='grid-container'>
          {spots.map((spot, i) => {
            if(spot.city === currentTrip.city) {
              return (
                <Link to={`/spots/${spot._id}`} className='spot-card'>
                <img src={spot.img} />
                <span>{spot.name}</span>
                </Link>
                )
            }
            
          })}
      </section>
    )
  }
}

export default withAuth(TripSpots);