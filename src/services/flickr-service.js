import axios from 'axios';


class FlickrService {
  constructor() {
    this.flickr = axios.create({
      baseURL: 'https://www.flickr.com/services/rest',
    })
  }
  
  getCityImage(lat,lon) {
    return this.flickr.get('/',{
      params: {
        method: 'flickr.photos.search',
        api_key: 'dcbcfae7f844135c27cd3eee275e7949',
        // privacy_filter: 1,
        license: 9,
        content_type: 1,
        accuracy: 6,
        media: 'photos',
        geo_context: 2,
        per_page: 15,
        format: 'json',
        nojsoncallback: 1,
        lon: `${lat}`,
        lat: `${lon}`,
      }
    })
    .then((response) => {
      const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
      const randomPic = randomIntegerInRange(3,14);
      return response.data.photos.photo[randomPic]
    })
  }
  

}

const flickrService = new FlickrService();

export default flickrService;