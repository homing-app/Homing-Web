import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})

const authenticate = (home) => {
  return http.post('/authenticate', home)
    .then(response => response.data)
    .catch(error => error)
}

const register = (home) => {
  return http.post('home/register', home)
    .then(response => response.data)
}

const logout = () => {
  return http.post('/logout')
    .then(response => response.data)
}

export default { authenticate, register, logout };