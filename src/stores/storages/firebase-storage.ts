import { type StateStorage, createJSONStorage } from 'zustand/middleware'
import axios from 'axios'

const firebaseUrl =
  'https://zustand-storage-6a320-default-rtdb.firebaseio.com/person/zustand'

// Variable que almacena al metodo setTimeout para enviar los datos del local storage a la base de datos
let debounceData: number

const storageApi: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const { data } = await axios.get(`${firebaseUrl}/${name}.json`)

      return JSON.stringify(data)
    } catch (error) {
      console.log(error)
      throw new Error('Hubo un problema')
    }
  },

  setItem: (name: string, value: string) => {
    try {
      if (value) clearInterval(debounceData)

      debounceData = setTimeout(async (): Promise<string | null> => {
        await axios.put(`${firebaseUrl}/${name}.json`, value)

        return null
      }, 600)
    } catch (error) {
      console.log(error)
      throw new Error('Hubo un problema')
    }
  },

  removeItem: (name: string): void => {
    console.log('removeItem', { name })
  },
}

export const firebaseStorage = createJSONStorage(() => storageApi)
