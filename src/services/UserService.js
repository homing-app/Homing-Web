import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})

const setuphome = (user) => {
  return http.post('/:id/setuphome', user)
    .then(response => response.data)
    .catch(error => error)
}

export default { setuphome };