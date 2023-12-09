import { type StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

// Los metodos que se obtienen de zustand son de tipo StateCreator, esto ayuda a que typescript sepa que esta es una variable que almacena datos para manejar los states, y tambien gracias a este tipado typescript sabe cual es la funcion y el tipo del parametro set
// El type StateCreator necesita entre 1 y 4 argumentos de tipo para que construya los states basados en esos tipados, por eso se agregan los genéricos <PersonState & Actions>
const storeApi: StateCreator<PersonState & Actions> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) =>
    set(() => ({
      firstName: value,
    })),

  setLastName: (value: string) =>
    set(() => ({
      lastName: value,
    })),
})

// En typescript si tenemos 2 interfaces separadas y queremos que una funcion o metodo retorne las 2 interfaces se lo puede hacer usando el operador and &
export const usePersonStore = create<PersonState & Actions>()(
  // persist() es un middleware de zustand, y su trabajo es hacer que los states sean persistentes, es decir que por mas que actualicemos la pagina los states no se van a resetear, esto es posible ya que guarda los states en el storage del navegador
  // Este middleware recibe 2 argumentos, el primero es toda la funcion que contiene el metodo create(), y el segundo es un objeto con opciones, una de las que uso es la opcion 'name', que es para indicar como queremos que se llame la key del local storage en donde guardaran estos states, y le puse de nombre 'person-storage', entonces cuando los valores de estos states cambien, en el local storage del navegador se creara una key llamada 'person-storage' y es la que almacenara los states
  // El middleware persist no solo guarda los states en el local storage, si no que tambien se encargara de observar la key 'person-storage' del local storage para establecer y actualizar los states
  persist(
    // Primer argumento de persist
    storeApi,
    // Segundo argumento de persist
    {
      name: 'person-storage',
    }
  )
)
