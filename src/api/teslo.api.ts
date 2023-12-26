import axios from 'axios'
import { useAuthStore } from '../stores'

const tesloApi = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// Interceptors
tesloApi.interceptors.request.use((config) => {
  // Aqui estamos trayendo el state token de zustand pero no usamos el store como un hook porque no estamos dentro de un componente de react, en este caso extraemos el state usando el metodo getState()
  const token = useAuthStore.getState().token
  console.log(token)

  if (token) {
    // Modificamos la propiedad 'Authorization' del header de la peticion
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export { tesloApi }
