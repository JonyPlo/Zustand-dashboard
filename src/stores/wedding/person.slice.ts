import type { StateCreator } from 'zustand'

// Un Slice es solo una parte de todo el store
export interface PersonSlice {
  firstName: string
  lastName: string

  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
}

export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
})
