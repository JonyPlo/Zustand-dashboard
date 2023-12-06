import { create } from 'zustand'

interface Bear {
  id: number
  name: string
}

interface BearState {
  // States
  blackBears: number
  polarBears: number
  pandaBears: number
  bears: Bear[]

  // State with computed property ( Getter )
  computed: {
    totalBears: number
  }

  // Methods
  increaseBlackBears: (by: number) => void
  increasePolarBears: (by: number) => void
  increasePandaBears: (by: number) => void
  doNothing: () => void
  addBear: () => void
  clearBears: () => void
}

// La diferencia al usar TypeScript es que en lugar de escribir create(...), tienes que escribir create<T>()(...) (fíjate también en los paréntesis extra () junto con el parámetro de tipo) donde T es el tipo del estado a anotar.
// Lo que estamos haciendo aqui es que el metodo create retorna una funcion, y como devuelve una funcion despues invocamos esa funcion que es lo que viene despues de esta forma: create()(() => ({})), en este ejemplo podemos ver como la funcion que se invoca tambien retorna implícitamente un objeto
export const useBearStore = create<BearState>()((set, get) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,

  bears: [
    {
      id: 1,
      name: 'Oso #1',
    },
  ],

  // Esto es un state con una propiedad computada, ya que usamos el metodo get del objeto para retornar y obtener la suma de todos los states, entonces para poder usar esta propiedad computada en otro lugar seria de esta forma store.computed.totalBears sin los parentesis al final
  // Recordar que si el metodo totalBears fuera un metodo normal y no un getter o setter (propiedad computada), se debería llamarlo de esta forma store.computed.totalBears()
  computed: {
    get totalBears(): number {
      return (
        get().blackBears +
        get().polarBears +
        get().pandaBears +
        get().bears.length
      )
    },
  },

  increaseBlackBears: (by: number) =>
    set((state) => ({ blackBears: state.blackBears + by })),

  increasePolarBears: (by: number) =>
    set((state) => ({ polarBears: state.polarBears + by })),

  increasePandaBears: (by: number) =>
    set((state) => ({ pandaBears: state.pandaBears + by })),

  doNothing: () => set((state) => ({ bears: [...state.bears] })),

  addBear: () =>
    set((state) => ({
      bears: [
        ...state.bears,
        {
          id: state.bears.length + 1,
          name: `Oso #${state.bears.length + 1}`,
        },
      ],
    })),

  clearBears: () => set({ bears: [] }),
}))
