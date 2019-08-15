import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.BACKEND_DOMAIN,
      withCredentials: true
    })
  }

  signup(user) {
    const { email, password, name, birthdate, city, language } = user;
    return this.auth.post('/auth/signup', {email, password, name, birthdate, city, language})
      .then(({ data }) => data);
  }

  login(user) {
    const { email, password} = user;
    return this.auth.post('/auth/login', {email, password})
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/auth/logout')
      .then(response => response.data)
  }

  me() {
    return this.auth.get('/auth/me')
    .then(response => response.data)
  }
}

const authService = new AuthService();

export default authService;