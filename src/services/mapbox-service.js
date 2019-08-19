import axios from 'axios';


class MapboxService {
  constructor() {
    this.mapbox = axios.create({
      baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
      params: {
        types: 'places',
        access_token: 'pk.eyJ1IjoicGllcm9iaiIsImEiOiJjanlpbjYxYXEwMDg3M21yeHhiYzZvbGh1In0.s4qwoXQLSGVCCH84CbKd_g'
      }
    })
  }
  

  getCityName(lon,lat) {
    return this.mapbox.get(`${lon},${lat}.json`)
    .then(response => console.log(response.data))
  }
  

}

const mapboxService = new MapboxService();

export default mapboxService;