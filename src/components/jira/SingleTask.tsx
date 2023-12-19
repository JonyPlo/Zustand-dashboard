import { IoReorderTwoOutline } from 'react-icons/io5'
import { Task } from '../../interfaces'
import { useTaskStore } from '../../stores'

interface Props {
  task: Task
}

export const SingleTask = ({ task }: Props) => {
  const setDraggingTaskId = useTaskStore((state) => state.setDraggingTaskId)
  const removeDraggingTaskId = useTaskStore(
    (state) => state.removeDraggingTaskId
  )

  return (
    <div
      // Con la propiedad draggable habilitamos para que este item se pueda arrastrar
      draggable
      // Con onDragStart puedo ejecutar algo desde el primer momento que se comienza a arrastrar el item
      onDragStart={() => setDraggingTaskId(task.id)}
      // onDragEnd es lo mismo que onDragStart pero cuando se suelta el item
      onDragEnd={() => removeDraggingTaskId()}
      className='mt-5 flex items-center justify-between p-2'
    >
      <div className='flex items-center justify-center gap-2'>
        <p className='text-base font-bold text-navy-700'>{task.title}</p>
      </div>
      <span className=' h-6 w-6 text-navy-700 cursor-pointer'>
        <IoReorderTwoOutline />
      </span>
    </div>
  )
}
