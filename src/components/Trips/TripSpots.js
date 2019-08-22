import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';
import spotsService from '../../services/spots-service';
import userService from '../../services/user-service';


class TripSpots extends Component {

  state = {
    spots: [],
    userSpots: this.props.user.spots,
    counter: 0,
  }

  componentDidMount(){
    let initCounter = 0;
    spotsService.getSpots()
    .then(response => {
      response.listOfSpots.map((spot, i) => {
        if(spot.city === this.props.currentTrip.city){
        return this.state.userSpots.includes(spot._id) && initCounter++
        } else {
          return initCounter
        }
      })
    this.setState({
      spots: response.listOfSpots,
      counter: initCounter,
    })
  })
  }

  saveSpot = (id) => {
    // let counter = 0;
    userService.saveSpot(id)
    .then(response => {
      this.props.me();
      // const userSpotsCopy = [...response.updatedUser.spots]
      // userSpotsCopy.map((spot) => {
      //   return userSpotsCopy.includes(spot) && counter++
      // })
      this.setState({
        userSpots: response.updatedUser.spots,
        // counter: counter,
      })
    })
  }


  render() {
    const {spots, trip, userSpots, counter} = this.state;
    const {currentTrip} = this.props;
    return (
      <div className='main-container'>
        <section className='title'>
        <h3>Saved spots</h3>
        <span>({counter})</span>
        </section>
        
          {userSpots.length > 0
          ?
          <section className='grid-container'>
          {spots.map((spot, i) => {
            if(spot.city === currentTrip.city) {
              if(userSpots.includes(spot._id)){
                return (
                  <div key={spot._id} className={'spot-card'}>
                  <span className='heart' onClick={() => {
                    this.saveSpot(spot._id)
                  }}>
                    <img src='/images/heart-circle-full.svg' alt='Spot saved'/>
                  </span>
                  <Link to={`/spots/${spot._id}`}>
                  <img src={`/city_images/${spot.img}`} alt={spot.name} className='spot-image'/>
                  <span className='spot-title'>{spot.name}</span>
                  </Link>
                  </div>
                  )
                }                
              }
            })}
            </section>
          :
          <p style={{'padding': '0 5vw','text-align': 'left', 'margin-bottom': '25px', 'font-size': '0.8em'}}>No saved spots yet... Check some awesome spots:</p>
          }

        <section className='title'>
        <h3>Pouplar spots</h3>
        </section>
        <section className='grid-container'>
            {spots.map((spot, i) => {
              if(spot.city === currentTrip.city) {
                if(!userSpots.includes(spot._id)){
                  return (
                    <div key={spot._id} className={'spot-card'}>
                    <span className='heart' onClick={() => {
                      this.saveSpot(spot._id)
                    }}>
                      <img src='/images/heart-circle-empty.svg' alt='Spot empty'/>
                    </span>
                    <Link to={`/spots/${spot._id}`}>
                    <img src={`/city_images/${spot.img}`} alt={spot.name} className='spot-image'/>
                    <span className='spot-title'>{spot.name}</span>
                    </Link>
                    </div>
                    )
                }                
              }
            })}
        </section>
      </div>
    )
  }
}

export default withAuth(TripSpots);