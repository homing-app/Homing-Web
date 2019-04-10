import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})

const create = (itemLog) => {
  return http.post('itemlog/create', itemLog)
    .then(response => response.data)
    .catch(error => error)
}

// const edit = (item) => {
//   const info = {
//     id: item,
//     state: "done"
//   }
//   return http.put(`item/${item}`, info)
//     .then(response => response.data)
//     .catch(error => error)
// }

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

// const remove = (item) => {
//   return http.delete(`item/${item}`)
//     .then(response => response.data)
//     .catch(error => error)
// }

export default { create };
