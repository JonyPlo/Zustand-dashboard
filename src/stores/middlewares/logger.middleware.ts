import { StateCreator, StoreMutatorIdentifier } from 'zustand'

// Interfaces
type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>

// Middleware
// El middleware es una funcion que retorna otra function, la primer funcion tiene 2 parametros (f y name) el primer parametro 'f' es la funcion que se retorna con los parametros (set, get y store), en otras palabras, el parametro 'f' es igual a esto (set, get, store) => { ... }, y el name es opcional, pero si se lo manda se establece un nombre a lo que retorne el parametro 'f'
const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    set(...a)
    console.log(...(name ? [`${name}:`] : []), get())
  }
  store.setState = loggedSet

  return f(loggedSet, get, store)
}

export const logger = loggerImpl as unknown as Logger
