import axios from 'axios';

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials:true,
    })
  }

  saveSpot(id){
    return this.user.put(`/user/spots/${id}/switch`)
    .then(response => response.data)
  }
}

const userService = new UserService();

export default userService;