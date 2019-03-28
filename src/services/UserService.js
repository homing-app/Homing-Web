import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})

const setuphome = (user) => {
  console.log("entra")
  console.log("user =>", user)
  return http.put(`/user/${user.id}/setuphome`, user)
    .then(response => response.data)
    .catch(error => error)
}

export default { setuphome };