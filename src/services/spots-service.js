import axios from 'axios';

class SpotsService {
  constructor() {
    this.spots = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials:true,
    })
  }

  getSpots() {
    return this.spots.get('/spots/')
    .then(response => response.data)
  }

  getSpot(id) {
    return this.spots.get(`/spots/${id}`)
    .then(response => response.data)
  }

}

const spotsService = new SpotsService();

export default spotsService;