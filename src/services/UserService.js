import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})

const setuphome = (user) => {
  return http.put(`/user/${user.id}/setuphome`, user)
    .then(response => response.data)
    .catch(error => error)
}

const edit = (user, id) => {
  const data = new FormData()
  Object.keys(user).forEach(key => {
    data.append(key, user[key])
  })

  return http.put(`/user/${id}`, data)
    .then(response => console.log(response))
    .catch(error => error);
}


const details = (user) => {
  return http.get(`user/${user}`)
    .then(response => response.data)
    .catch(error => error)
}

export default { setuphome, details, edit };