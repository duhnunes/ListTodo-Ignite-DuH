import { useContext } from 'react'

import {
  AddTodoContext,
  CreateAddTodoData,
} from '../../contexts/ListTodoContext'
import { DeleteTask } from '../deleteTask'
import { EditTask } from '../editTask'
import { Markdown } from '../markdown/markdown'
import { Checkbox } from '../ui/checkbox'

interface TaskComponentProps extends CreateAddTodoData {}

export const TaskComponent = ({ id, task, isChecked }: TaskComponentProps) => {
  const { handleTaskToggle, countCharacter } = useContext(AddTodoContext)

  const checkboxCheckedClassName = isChecked ? 'checkboxCheckedCss' : ''

  return (
    <article
      className="shadow-shape flex gap-2 md:flex-row flex-col cursor-default items-start  rounded-lg bg-gray-500 p-4 transition-all hover:brightness-110 outline-none focus:border-purple-dark focus:ring-2 focus:ring-purple-dark"
      tabIndex={0}
      aria-label="Item da Tarefa"
    >
      <Checkbox
        data-id={id}
        checked={isChecked}
        onCheckedChange={(checked) => handleTaskToggle(id, checked)}
        className="-order-2 md:order-none"
        role="checkbox"
        aria-label={isChecked ? 'Desmarcar tarefa.' : 'Marcar tarefa.'}
      />
      <div
        className={`flex-1 text-sm text-gray-100 w-full break-words outline-none focus:border-purple-dark focus:ring-2 placeholder:select-none focus:ring-purple-dark transition-all duration-150 rounded-md ${checkboxCheckedClassName}`}
      >
        <Markdown task={task} id={id} countCharacterTotal={countCharacter} />
      </div>
      <div className="flex items-center gap-2 -order-2 md:order-none self-end -mt-7 md:mt-0 md:self-auto">
        <EditTask task={task} id={id} countCharacterTotal={countCharacter} />
        <DeleteTask task={task} id={id} countCharacterTotal={countCharacter} />
      </div>
    </article>
  )
}
