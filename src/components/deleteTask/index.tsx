import { Trash2 } from 'lucide-react'
import { useContext } from 'react'

import { AddTodoContext, CreateAddTodoData } from '@/contexts/ListTodoContext'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

export function DeleteTask({ id, task }: CreateAddTodoData) {
  const { handleDeleteTask } = useContext(AddTodoContext)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" aria-label="Deletar task">
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        className="shadow-shape flex flex-col gap-1 border-none bg-gray-600 text-gray-100"
        role="alertdialog"
      >
        <AlertDialogTitle>
          Deseja realmente deletar esta tarefa?
        </AlertDialogTitle>
        <AlertDialogDescription>
          A task será deletada permanentemente, essa ação não pode ser desfeita.
        </AlertDialogDescription>
        <p
          className="shadow-code mb-4 max-h-60 overflow-auto rounded-md bg-zinc-900 p-2 focus:outline-none text-gray-300"
          tabIndex={0}
        >
          {task}
        </p>
        <div className="flex justify-end gap-2">
          <AlertDialogCancel asChild>
            <Button variant="outline" size="lg">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <>
              <Button
                variant="destructive"
                size="lg"
                onClick={() => handleDeleteTask(id)}
              >
                Confirmar
              </Button>
            </>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
