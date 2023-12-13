import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

  // Methods
  totalBears: () => number
  increaseBlackBears: (by: number) => void
  increasePolarBears: (by: number) => void
  increasePandaBears: (by: number) => void
  doNothing: () => void
  addBear: () => void
  clearBears: () => void
}

// La diferencia al usar TypeScript es que en lugar de escribir create(...), tienes que escribir create<T>()(...) (fíjate también en los paréntesis extra () junto con el parámetro de tipo) donde T es el tipo del estado a anotar.
// Lo que estamos haciendo aqui es que el metodo create retorna una funcion, y como devuelve una funcion despues invocamos esa funcion que es lo que viene despues de esta forma: create()(() => ({})), en este ejemplo podemos ver como la funcion que se invoca tambien retorna implícitamente un objeto
export const useBearStore = create<BearState>()(
  persist(
    // El parametro get es una funcion que devuelve todos los states para poder usarlos dentro de nuestros metodos, por ejemplo get().blackBears nos devolvera el valor del state blackBears
    (set, get) => ({
      blackBears: 10,
      polarBears: 5,
      pandaBears: 1,
      bears: [
        {
          id: 1,
          name: 'Oso #1',
        },
      ],

      totalBears: () => {
        return (
          get().blackBears +
          get().polarBears +
          get().pandaBears +
          get().bears.length
        )
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
    }),
    {
      name: 'bears-store',
    }
  )
)
