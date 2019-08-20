import axios from 'axios';


class FlickrService {
  constructor() {
    this.flickr = axios.create({
      baseURL: 'https://www.flickr.com/services/rest',
    })
  }
  


// 13.38333
// 52.51667
  
  getCityImage(lat,lon) {
    return this.flickr.get('/',{
      params: {
        method: 'flickr.photos.search',
        api_key: 'dcbcfae7f844135c27cd3eee275e7949',
        privacy_filter: 1,
        accuracy: 11,
        content_type: 1,
        media: 'photos',
        geo_context: 2,
        per_page: 1,
        format: 'json',
        nojsoncallback: 1,
        lon: `${lat}`,
        lat: `${lon}`,
      }
    })
    .then(response => response.data.photos.photo[0])
  }
  

}

const flickrService = new FlickrService();

export default flickrService;