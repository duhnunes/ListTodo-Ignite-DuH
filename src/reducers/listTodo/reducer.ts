/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateAddTodoData } from '@/contexts/ListTodoContext'

import { ActionTypes } from './actions'

export function todoListReducer(state: CreateAddTodoData[], action: any) {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      return [action.payload, ...state]

    case ActionTypes.DELETE_TASK:
      return state.filter((item) => item.id !== action.payload.id)

    case ActionTypes.EDIT_TASK:
      return action.payload.updatedList

    case ActionTypes.UPDATE_CHECKBOX_TASK:
      return action.payload.updateCheckboxTask

    default:
      return state
  }
}
