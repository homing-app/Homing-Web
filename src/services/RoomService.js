import axios from 'axios';

const http = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
})

const create = (room) => {
  return http.post('room/create', room)
    .then(response => response.data)
    .catch(error => error)
}

const edit = (room, state) => {
  const info = {
    id: room,
    state: state
  }
  return http.put(`room/${room}`, info)
    .then(response => response.data)
    .catch(error => error)
}

const remove = (room) => {
  return http.delete(`room/${room}`)
    .then(response => response.data)
    .catch(error => error)
}

export default { create, edit, remove };
