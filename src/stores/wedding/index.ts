import { create } from 'zustand'
import { PersonSlice, createPersonSlice } from './person.slice'
import { devtools } from 'zustand/middleware'
import { GuestSlice, createGuestSlice } from './guest.slice'
import { DateSlice, createDateSlice } from './date.slice'
import {
  ConfirmationSlice,
  createConfirmationSlice,
} from './confirmation.slice'

// En ShareState voy a almacenar todas las interfaces de todos los slices para luego agregar estos tipados al create() de zustand
type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice

// La palabra 'Bound' en el nombre useWeddingBoundStore hace referencia a que es un store compuesto de slices
export const useWeddingBoundStore = create<ShareState>()(
  devtools(
    // Lo que estamos haciendo en (...a) es usando el operador rest (...) para tomar los argumentos set, get y store unirlos en un arreglo, es una forma simplificada de poder obtener todos los parametros sin escribirlos uno por uno
    (...a) => ({
      // Aqui van los Slices que voy creando.
      // En este caso dentro del metodo createPersonSlice estamos usando el operador spread (...) que se escribe igual que el operador rest, pero lo que estamos haciendo aqui es dispersando los valores que contiene el arreglo "a"
      ...createPersonSlice(...a),
      ...createGuestSlice(...a),
      ...createDateSlice(...a),
      ...createConfirmationSlice(...a),
    })
  )
)
