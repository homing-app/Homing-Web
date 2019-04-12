import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASEURL || "http://localhost:3001/",
  // baseURL: "http://localhost:3001/",
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


const details = (id) => {
  return http.get(`user/${id}`)
    .then(response => response.data)
}

const remove = (id) => {
  const data = {
    home: null
  }
  return http.put(`user/${id}/removehome`, data)
    .then(response => console.log(response))
    .catch(error => error);
}

const logout = () => {
  return http.post('/logout')
    .then(response => console.log(response))
    .catch(error => error);
}

export default { setuphome, details, edit, remove, logout };