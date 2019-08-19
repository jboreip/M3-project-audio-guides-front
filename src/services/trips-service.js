import axios from 'axios';

class TripsService {
  constructor() {
    this.trips = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials:true,
    })
  }

  getUserTrips() {
    return this.trips.get('/trips/' )
    .then(response => response.data)
  }

  newTrip(trip, user) {
    const { city, location, img, fromDate, toDate } = trip;
    return this.trips.post('/trips/new/', { city, location, img, fromDate, toDate, user })
    .then((response => response.data))
  }

}

const tripsService = new TripsService();

export default tripsService;