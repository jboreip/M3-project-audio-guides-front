import axios from 'axios';

class SpotsService {
  constructor() {
    this.spots = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials: false
    })
  }

  getSpots() {
    return this.spots.get('/spots/')
    .then(response => response.data)
  }
}

const spotsService = new SpotsService();

export default spotsService;