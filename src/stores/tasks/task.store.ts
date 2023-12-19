import { create, type StateCreator } from 'zustand'
import type { TaskStatus, Task } from '../../interfaces'
import { devtools, persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
// import { produce } from 'immer';
import { immer } from 'zustand/middleware/immer'

interface TaskState {
  tasks: Record<string, Task> // <-- Record<string, Task> es lo mismo que { [key: string]: Task }
  draggingTaskId?: string

  getTaskByStatus: (status: TaskStatus) => Task[]
  addTask: (title: string, status: TaskStatus) => void
  setDraggingTaskId: (taskId: string) => void
  removeDraggingTaskId: () => void
  changeTaskStatus: (taskId: string, status: TaskStatus) => void
  onTaskDrop: (status: TaskStatus) => void
}

const storeApi: StateCreator<
  TaskState,
  [
    ['zustand/devtools', never],
    ['zustand/persist', unknown],
    ['zustand/immer', never]
  ],
  []
> = (set, get) => ({
  tasks: {
    'ABC-1': {
      id: 'ABC-1',
      title: 'Task 1',
      status: 'open',
    },
    'ABC-2': {
      id: 'ABC-2',
      title: 'Task 2',
      status: 'in-progress',
    },
    'ABC-3': {
      id: 'ABC-3',
      title: 'Task 3',
      status: 'open',
    },
    'ABC-4': {
      id: 'ABC-4',
      title: 'Task 4',
      status: 'open',
    },
  },

  draggingTaskId: undefined,

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks

    // Object.values() toma al objeto que tiene como argumento, y a los valores de las propiedades los separa por coma dentro de un array, por lo tanto devuelve un array con los valores de las propiedades
    return Object.values(tasks).filter((task) => task.status === status)
  },

  addTask: (title, status) => {
    const newTask = { id: uuid(), title, status }

    //? Forma usando el middleware immer de Zustand
    set(
      (state) => {
        state.tasks[newTask.id] = newTask
      },
      false,
      'addTask'
    )

    //? Esta forma requiere el paquete immer - pnpm add immer
    // El metodo produce viene del paquete immer, y nos permite mutar estados
    // set( produce((state: TaskState) => {
    // state.tasks[newTask.id] = newTask
    // }))

    //? Forma nativa de Zustand
    // set(state => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask
    //   }
    // }))
  },

  setDraggingTaskId: (taskId) => {
    set({ draggingTaskId: taskId }, false, 'setDragging')
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined }, false, 'removeDragging')
  },

  changeTaskStatus: (taskId, status) => {
    //? Forma nativa con Zustand
    // const task = get().tasks[taskId]
    // task.status = status

    // set(state => ({
    //   tasks: {
    //     ...state.tasks,
    //     [taskId]: task
    //   }
    // }))

    //? Usando el middleware immer
    set(
      (state) => {
        state.tasks[taskId].status = status
      },
      false,
      'changeTaskStatus'
    )
  },

  // De esta forma se puede hacer un metodo que este conectado a otros
  // Con este metodo puedo ejecutar todos los demas metodos, esto sirve por si queremos usar un solo metodo para todo o usamos cada metodo por separado segun sea necesario
  onTaskDrop: (status) => {
    const taskId = get().draggingTaskId

    if (!taskId) return

    get().changeTaskStatus(taskId, status)
    get().removeDraggingTaskId()
  },
})

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(immer(storeApi), {
      name: 'task-store',
    })
  )
)
