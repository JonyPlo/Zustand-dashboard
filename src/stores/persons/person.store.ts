import { type StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { useWeddingBoundStore } from '../wedding'
// import { customSessionStorage } from '../storages/session-storage'
// import { firebaseStorage } from '../storages/firebase-storage'

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
const storeApi: StateCreator<
  PersonState & Actions,
  [['zustand/devtools', never]]
> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) =>
    // El metodo set tiene 3 argumentos, el primero es un callback en el que se encarga de establecer los nuevos states, tambien puede ser un solo objeto con las propiedades, el segundo argumento es un booleano que indica si se podra reemplazar el state o no, por defecto es false, pero si lo ponemos en true solo dejara cambiar el state una sola vez, y el tercer argumento es un string y sirve para poner un nombre a la accion que se mostrara en las devtools de redux en el navegador
    set(
      {
        firstName: value,
      },
      false,
      'setFirstName'
    ),

  setLastName: (value: string) =>
    set(
      {
        lastName: value,
      },
      false,
      'setLastName'
    ),
})

// En typescript si tenemos 2 interfaces separadas y queremos que una funcion o metodo retorne las 2 interfaces se lo puede hacer usando el operador and &
export const usePersonStore = create<PersonState & Actions>()(
  // El middleware devtools es para habilitar las devtools de redux en el navegador
  devtools(
    // persist() es un middleware de zustand, y su trabajo es hacer que los states sean persistentes, es decir que por mas que actualicemos la pagina los states no se van a resetear, esto es posible ya que guarda los states en el storage del navegador
    // Este middleware recibe 2 argumentos, el primero es toda la funcion que contiene el metodo create(), y el segundo es un objeto con opciones para personalizar el middleware.
    // El middleware persist no solo guarda los states en el local storage, si no que tambien se encargara de observar la key 'person-storage' del local storage para establecer y actualizar los states
    persist(
      // Primer argumento de persist - Store Api
      storeApi,
      // Segundo argumento de persist - Options
      {
        // La opcion 'name' es para indicar como queremos que se llame la key del local storage en donde se guardaran los states. En este caso le puse de nombre 'person-storage', entonces cuando los valores de estos states cambien, en el local storage del navegador se creara una key llamada 'person-storage' con los datos.
        name: 'person-storage',
        // La opcion 'storage' es para elegir en que storage queremos almacenar los datos, ya sea en el local storage o en sesion storage
        // storage: customSessionStorage,
        // storage: firebaseStorage,
      }
    )
  )
)

// El metodo subscribe de un store nos permite poder transferir informacion del state de un store al state de otro store, este metodo emite 2 parametros, uno es nextState y el otro es prevState, prevState es el valor de los estados de como estaban antes de un cambio y nextState es como estan los states actualmente
usePersonStore.subscribe((nextState /*prevState*/) => {
  // nextState es un objeto que contiene todos los states del store usePersonStore
  const { firstName, lastName } = nextState

  // En este caso importamos el store useWeddingBoundStore, accedemos a los metodos setFirstName y setLastName los cuales esperan un argumento cada uno, y mandamos como argumento los states del store usePersonStore, y de esta forma cada vez que los states firstName y lastName cambien en el store usePersonStore, se ejecutaran los metodos del store useWeddingBoundStore para tambien modificar sus states
  // Tener en cuenta que 2 stores no deberían transmitirse informacion entre si porque eso podría producir una dependencia cíclica
  useWeddingBoundStore.getState().setFirstName(firstName)
  useWeddingBoundStore.getState().setLastName(lastName)
})
