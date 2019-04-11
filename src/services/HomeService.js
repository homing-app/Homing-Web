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

const details = (home) => {
  return http.get(`home/${home}`)
    .then(response => response.data)
}

const edit = (home, id) => {
  const data = new FormData();
  Object.keys(home).forEach(key => {
    data.append(key, home[key]);
  })

  return http.put(`/home/${id}`, data)
    .then(response => console.log(response))
    .catch(error => error);
}

export default { authenticate, register, logout, details, edit };
