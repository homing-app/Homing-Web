import axios from 'axios';

const http = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
})

const authenticate = (user) => {
  return http.post('/authenticate', user)
    .then(response => response.data)
    .catch(error => error)
}

const register = (user) => {
  return http.post('/register', user)
    .then(response => response.data)
}


const logout = () => {
  return http.post('/logout')
    .then(response => response.data)
}

export default { authenticate, register, logout };