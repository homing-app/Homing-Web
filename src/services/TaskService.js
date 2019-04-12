import axios from 'axios';

const http = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
})

const create = (task) => {
  return http.post('task/create', task)
    .then(response => response.data)
    .catch(error => error)
}

const edit = (task) => {
  const info = {
    id: task,
    state: "done"
  }
  return http.put(`task/${task}`, info)
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

const remove = (task) => {
  return http.delete(`task/${task}`)
    .then(response => response.data)
    .catch(error => error)
}

export default { create, edit, remove };
