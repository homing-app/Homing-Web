import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})

const authenticate = (home) => {
  return http.post('/', home)
    .then(response => response.data)
    .catch(error => error)
}

const register = (home) => {
  return http.post('home/register', home)
    .then(response => response.data)
    .catch(error => error)
}

const logout = () => {
  return http.post('/logout')
    .then(response => response.data)
    .catch(error => error)
}

const details = () => {
  return http.get('home/details')
    .then(response => response.data)
    .catch(error => error)
}

export default { authenticate, register, logout, details };