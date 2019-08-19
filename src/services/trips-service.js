import axios from 'axios';

class TripsService {
  constructor() {
    this.trips = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
    })
  }

  getUserTrips() {
    return this.trips.get('/trips/')
    .then(response => response.data)
  }

}

const tripsService = new TripsService();

export default tripsService;