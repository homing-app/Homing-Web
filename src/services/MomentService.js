import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})

const create = (moment) => {
  return http.post('moment/create', moment)
    .then(response => response.data)
    .catch(error => error)
}

const edit = (moment) => {
  return http.put(`moment/${moment}`, moment)
    .then(response => response.data)
    .catch(error => error)
}

// const list = () => {
//   return http.get('item/list')
//     .then(response => response.data)
//     .catch(error => error)
// }

// const details = () => {
//   return http.get('/logout')
//     .then(response => response.data)
//     .catch(error => error)
// }

// const remove = (home) => {
//   return http.delete(`home/${home}`)
//     .then(response => response.data)
//     .catch(error => error)
// }

export default { create, edit };
