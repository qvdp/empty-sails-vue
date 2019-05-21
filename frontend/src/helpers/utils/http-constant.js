import axios from 'axios'
import jwtDecode from 'jwt-decode'

// Build a unical instance of axios for store request
const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:1337',
  headers: {
    'Authorization': {
      toString () {
        return `Bearer ${localStorage.getItem('user-token')}`
      }
    }
  }
})

// Add a response interceptor
HTTP.interceptors.response.use(function (resp) {
  var decodedToken
  if (resp.data.token) {
    // Replace the token by the new one
    localStorage.setItem('user-token', resp.data.token)

    // Decode the token and return it
    decodedToken = jwtDecode(resp.data.token)
  } else {
    // Do something if no answer
  }
  return (decodedToken || resp)
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default HTTP
