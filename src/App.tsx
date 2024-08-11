/* eslint-disable import/no-absolute-path */
import { useContext } from 'react'

import clipboard from '/assets/clipboard.svg'
import logo from '/assets/logo.svg'

import { CreateTask } from './components/createTask'
import { TaskComponent } from './components/task'
import { GithubLink } from './components/ui/githubLink'
import { AddTodoContext } from './contexts/ListTodoContext'

export function App() {
  const { listTodo } = useContext(AddTodoContext)

  const checkedTasksCounter = listTodo.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1
    }

    return prevValue
  }, 0)

  return (
    <div className="min-h-screen w-full bg-gray-600 pb-10 text-gray-300 antialiased">
      <GithubLink />
      <header className="flex h-[200px] w-full select-none items-center justify-center gap-3 bg-gray-700">
        <img className="h-9 w-[22px]" src={logo} alt="" />
        <div>
          <span className="text-4xl font-black text-blue-light">to</span>
          <span className="text-4xl font-black text-purple-dark">do</span>
        </div>
      </header>

      <div className="mx-2">
        <CreateTask />
      </div>

      <section className="mx-auto flex max-w-[736px] flex-col gap-6 px-4 md:p-0">
        <article className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="cursor-default text-sm font-bold text-blue-light">
              Tarefas Criadas
            </span>
            <span
              className="shadow-shape select-none rounded-full bg-gray-400 px-2 py-1 text-xs font-bold text-gray-200 outline-none focus:outline-2 focus:outline-purple-light transition-all duration-150"
              tabIndex={0}
              aria-label={`Tarefas Criadas ${listTodo.length}`}
            >
              {listTodo ? listTodo.length : 0}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="cursor-default text-sm font-bold text-purple-light">
              Concluídas
            </span>
            <span
              className="shadow-shape select-none rounded-full bg-gray-400 px-2 py-1 text-xs font-bold text-gray-200  outline-none focus:outline-2 focus:outline-purple-light transition-all duration-150"
              tabIndex={0}
              aria-label={`Tarefas Concluídas ${checkedTasksCounter} de ${listTodo.length}`}
            >
              {checkedTasksCounter}
              &nbsp;de&nbsp;
              {listTodo?.length}
            </span>
          </div>
        </article>

        {listTodo?.length === 0 ? (
          <article
            className="flex flex-col items-center gap-4 px-6 py-16 border-t-2 border-gray-400 rounded-md"
            tabIndex={0}
            aria-label="Você ainda não tem tarefas cadastradas. Crie tarefas e organize seus itens a fazer."
          >
            <img src={clipboard} className="size-14" alt="" />

            <div className="flex w-full flex-col items-center text-center">
              <p className="font-bold text-gray-300">
                Você ainda não tem tarefas cadastradas
              </p>
              <p className="text-gray-300">
                Crie tarefas e organize seus itens a fazer
              </p>
            </div>
          </article>
        ) : (
          <>
            {listTodo?.map((item) => {
              return <TaskComponent key={item.id} {...item} />
            })}
          </>
        )}
      </section>
    </div>
  )
}
