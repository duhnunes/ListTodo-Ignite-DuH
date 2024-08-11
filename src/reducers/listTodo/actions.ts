import { CreateAddTodoData } from '@/contexts/ListTodoContext'

export enum ActionTypes {
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  EDIT_TASK = 'EDIT_TASK',
  UPDATE_CHECKBOX_TASK = 'UPDATE_CHECKBOX_TASK',
}

export function addNewTaskAction(newTask: CreateAddTodoData) {
  return {
    type: ActionTypes.ADD_TASK,
    payload: newTask,
  }
}

export function deleteTaskAction(id: string) {
  return {
    type: ActionTypes.DELETE_TASK,
    payload: {
      id,
    },
  }
}

export function editTaskAction(updatedList: CreateAddTodoData) {
  return {
    type: ActionTypes.EDIT_TASK,
    payload: {
      updatedList,
    },
  }
}

export function updateCheckboxTaskAction(
  updateCheckboxTask: CreateAddTodoData,
) {
  return {
    type: ActionTypes.UPDATE_CHECKBOX_TASK,
    payload: {
      updateCheckboxTask,
    },
  }
}
