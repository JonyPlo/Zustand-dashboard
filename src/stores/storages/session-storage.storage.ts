import { type StateStorage, createJSONStorage } from 'zustand/middleware'

// StateStorage es solamente para darle un tipado a la constante sessionStorage la cual ahora tiene que ser de tipo objeto que contenga 3 propiedades obligatorias (getItem, setItem, removeItem) las cuales almacenan funciones y cada funcion es para poder administrar en que storage se guardaran los states, en este caso haremos que se almacenen en el session storage
// Recordar que el dato que debe retornar la propiedad getItem tiene que tener agregado el tipado de Promise<string | null>, de lo contrario dara error
const storageApi: StateStorage = {
  getItem: (name: string): string | Promise<string | null> | null => {
    const data = sessionStorage.getItem(name)
    return data
  },
  setItem: (name: string, value: string): void => {
    sessionStorage.setItem(name, value)
  },
  removeItem: (name: string): void => {
    console.log('removeItem', { name })
  },
}

export const customSessionStorage = createJSONStorage(() => storageApi)
