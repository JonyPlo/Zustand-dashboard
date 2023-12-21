import { StateCreator } from 'zustand'

export interface DateSlice {
  eventDate: Date // number, string, primitivo

  eventYYYYMMDD: () => string
  eventHHMM: () => string

  setEventDate: (parcialDate: string) => void
  setEventTime: (eventTime: string) => void
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  //Properties
  eventDate: new Date(),

  // Actions
  eventYYYYMMDD: () => {
    return get().eventDate.toISOString().split('T')[0]
  },

  eventHHMM: () => {
    // El metodo padStart() hara que si la hora tiene un solo numero, entonces agregara un 0 al inicio, por eso espera 2 argumentos, el primero es para decirle cuantos numeros deben haber, o sea 2, y si hay uno solo entonces rellena ese numero que falta con un 0
    const hours = get().eventDate.getHours().toString().padStart(2, '0')
    const minutes = get().eventDate.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
  },

  setEventDate: (partialDate) =>
    set((state) => {
      const date = new Date(partialDate)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate() + 1
      const newDate = new Date(state.eventDate)

      newDate.setFullYear(year, month, day)

      return { eventDate: newDate }
    }),

  setEventTime: (eventTime) =>
    set((state) => {
      const hours = parseInt(eventTime.split(':')[0])
      const minutes = parseInt(eventTime.split(':')[1])
      const newDate = new Date(state.eventDate)

      newDate.setHours(hours, minutes)

      return { eventDate: newDate }
    }),
})
