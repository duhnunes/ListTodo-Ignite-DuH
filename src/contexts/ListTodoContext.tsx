/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'

import {
  addNewTaskAction,
  deleteTaskAction,
  editTaskAction,
  updateCheckboxTaskAction,
} from '@/reducers/listTodo/actions'
import { todoListReducer } from '@/reducers/listTodo/reducer'

export interface CreateAddTodoData {
  id: string
  task: string
  isChecked?: boolean
  isEditing?: boolean
  countCharacterTotal: number
}

interface ListTodoContextType {
  listTodo: CreateAddTodoData[]
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  createNewTask: (data: CreateAddTodoData) => void
  handleDeleteTask: (id: string) => void
  handleTaskToggle: (id: string, checked: boolean | string) => void
  handleEditTask: (id: string) => void
  countCharacter: number
  setCountCharacter: Dispatch<SetStateAction<number>>
  maxCharacter: number
  halfCharacter: number
  almostMaxCharacter: number
}

interface ListTodoContextProps {
  children: ReactNode
}

export const AddTodoContext = createContext({} as ListTodoContextType)

export function AddTodoProvider({ children }: ListTodoContextProps) {
  const [inputValue, setInputValue] = useState('')
  const [countCharacter, setCountCharacter] = useState(0)

  const maxCharacter = 1000
  const halfCharacter = maxCharacter / 2
  const almostMaxCharacter = Math.floor(
    (maxCharacter * halfCharacter) / (22 * 28.4), // Essa foi uma conta maluca que eu fiz para chegar no valor próximo a 800 utilizando 1000 como máximo de characters
  )

  const localStorageName = '@ignite-duh-todo:task-state-1.1.1'

  const [listTodo, dispatch] = useReducer(
    todoListReducer,
    [],
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(localStorageName)

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(listTodo)

    localStorage.setItem(localStorageName, stateJSON)
  }, [listTodo])

  function createNewTask(data: CreateAddTodoData) {
    const id = uuidv4()
    const newTask: CreateAddTodoData = {
      id,
      task: data.task,
      isChecked: data.isChecked,
      isEditing: data.isEditing,
      countCharacterTotal: countCharacter,
    }

    dispatch(addNewTaskAction(newTask))
  }

  function handleDeleteTask(id: string) {
    dispatch(deleteTaskAction(id))
  }

  function handleEditTask(id: string) {
    const updatedList = listTodo.map((item: any) =>
      item.id === id
        ? {
            ...item,
            task: inputValue,
            isEditing: !item.isEditing,
            countCharacterTotal: countCharacter,
          }
        : item,
    )

    dispatch(editTaskAction(updatedList))
  }

  function handleTaskToggle(id: string, checked: boolean | string) {
    const value = checked === true || checked === 'true'
    const updateCheckboxTask = listTodo.map((task: any) => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }
      return task
    })

    dispatch(updateCheckboxTaskAction(updateCheckboxTask))
  }

  return (
    <AddTodoContext.Provider
      value={{
        inputValue,
        setInputValue,
        listTodo,
        handleDeleteTask,
        handleTaskToggle,
        handleEditTask,
        createNewTask,
        countCharacter,
        halfCharacter,
        maxCharacter,
        setCountCharacter,
        almostMaxCharacter,
      }}
    >
      {children}
    </AddTodoContext.Provider>
  )
}
