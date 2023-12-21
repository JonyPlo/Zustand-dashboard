import { StateCreator } from 'zustand'

export interface ConfirmationSlice {
  isConfirmed: boolean

  setIsConfirmed: (value: boolean) => void
}

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (
  set
) => ({
  // Properties
  isConfirmed: false,

  // Actions
  setIsConfirmed: (value) => {
    set({ isConfirmed: value })
  },
})
