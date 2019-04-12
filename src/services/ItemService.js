import axios from 'axios';

const http = axios.create({
    baseURL: process.env.REACT_APP_BASEURL || "http://localhost:3001/",
  // baseURL: "http://localhost:3001/",
  withCredentials: true,
})

const create = (item) => {
  return http.post('item/create', item)
    .then(response => response.data)
    .catch(error => error)
}

const edit = (item) => {
  const info = {
    id: item,
    state: "done"
  }
  return http.put(`item/${item}`, info)
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

const remove = (item) => {
  return http.delete(`item/${item}`)
    .then(response => response.data)
    .catch(error => error)
}

export default { create, edit, remove };
