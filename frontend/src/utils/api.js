import axios from 'axios'

// One shared axios instance for the whole app.
// `withCredentials: true` is what lets the browser send/receive the
// httpOnly "token" cookie the backend sets on login - that's how the
// backend knows who's making each request, without us touching localStorage.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export default api
