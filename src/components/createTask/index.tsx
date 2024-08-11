import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { Eye, Pencil, PlusCircle, X } from 'lucide-react'
import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { AddTodoContext } from '@/contexts/ListTodoContext'

import { Markdown } from '../markdown/markdown'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Textarea } from '../ui/textarea'

const listTodoValidationSchema = z.object({
  id: z.string(),
  task: z.string().min(3, {
    message: 'Informe um mínimo de 3 caracteres',
  }),
  isChecked: z.boolean(),
  isEditing: z.boolean(),
  countCharacterTotal: z.number(),
})
type ListTodoFormData = z.infer<typeof listTodoValidationSchema>

export function CreateTask() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPreviewMarkdown, setIsPreviewMarkdown] = useState(false)

  const {
    inputValue,
    setInputValue,
    createNewTask,
    countCharacter,
    setCountCharacter,
    halfCharacter,
    maxCharacter,
    almostMaxCharacter,
  } = useContext(AddTodoContext)

  const newAddTodo = useForm<ListTodoFormData>({
    resolver: zodResolver(listTodoValidationSchema),
    defaultValues: {
      task: '',
      id: '',
      isChecked: false,
      isEditing: false,
      countCharacterTotal: 0,
    },
  })

  const { register, handleSubmit, reset, control } = newAddTodo

  function handleAddTask(data: ListTodoFormData) {
    createNewTask(data)
    reset()
    setIsDialogOpen(false)
    setIsPreviewMarkdown(false)
  }

  function handleClose() {
    reset()
    setCountCharacter(0)
    setIsPreviewMarkdown(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mx-auto max-w-[736px] -translate-y-1/2 justify-between hover:text-gray-200"
          variant="input"
          onClick={() => setIsDialogOpen(true)}
        >
          <p className="italic text-gray-300 font-normal">
            Adicione uma nova tarefa
          </p>
          <div className="flex items-center gap-2">
            Criar
            <PlusCircle className="size-4" />
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogClose
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <form
          onSubmit={handleSubmit(handleAddTask)}
          className="mx-auto flex flex-col gap-4 w-full max-sm:gap-7"
        >
          <DialogHeader>
            <DialogTitle className="text-gray-100">Criar Tarefa</DialogTitle>
            <DialogDescription>
              Adicione uma nova tarefa à sua lista utilizando{' '}
              <strong className="text-gray-100 underline">markdown</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="relative flex-1 rounded-lg bg-gray-500 text-gray-100 text-sm transition-all duration-150 ring-offset-background placeholder:text-gray-300  outline-none placeholder:select-none focus:border-purple-dark focus:ring-2  focus:ring-purple-dark group">
            {isPreviewMarkdown ? (
              <div className="p-3 max-h-[550px] overflow-auto whitespace-break-spaces break-words">
                <Markdown
                  task={inputValue}
                  id={inputValue}
                  countCharacterTotal={countCharacter}
                />
              </div>
            ) : (
              <Controller
                name="task"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Adicione uma nova tarefa"
                    className={`group-focus-within:outline-none group-focus-within:border-purple-dark group-focus-within:ring-2 group-focus-within:ring-purple-dark text-gray-200
                    ${countCharacter >= halfCharacter && countCharacter <= almostMaxCharacter && 'group-focus-within:ring-amber-500 group-focus-within:border-amber-500 text-amber-500'}
                    ${countCharacter > almostMaxCharacter && countCharacter < maxCharacter && 'group-focus-within:ring-orange-500 group-focus-within:border-orange-500 text-orange-500'}
                    ${countCharacter === maxCharacter && 'group-focus-within:ring-red-500 group-focus-within:border-red-500 text-red-500'}

                  `}
                    maxLength={maxCharacter}
                    {...register('task', {
                      required: true,
                      value: inputValue,
                      onChange: (e) => {
                        setInputValue(e.target.value)
                        setCountCharacter(e.target.value.length)
                      },
                    })}
                  />
                )}
              />
            )}
            {!isPreviewMarkdown && (
              <span
                className={`bg-transparent font-medium absolute -top-[30px] right-0 px-5 py-1
                ${countCharacter > halfCharacter && 'text-gray-200'}
                ${countCharacter >= halfCharacter && countCharacter <= almostMaxCharacter && 'text-amber-500'}
                ${countCharacter > almostMaxCharacter && countCharacter < maxCharacter && 'text-orange-500'}
                ${countCharacter === maxCharacter && 'text-red-500'}
              `}
              >
                {`${countCharacter} / ${maxCharacter}`}
              </span>
            )}
          </div>
          <DialogFooter className="gap-5">
            {isPreviewMarkdown ? (
              <Button
                variant="outline"
                type="button"
                size="lg"
                onClick={() => setIsPreviewMarkdown(false)}
                className="w-24 justify-around"
              >
                Edit
                <Pencil className="size-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                type="button"
                size="lg"
                onClick={() => setIsPreviewMarkdown(true)}
                className="w-24 justify-around"
              >
                Preview
                <Eye className="size-4" />
              </Button>
            )}
            <Button
              variant="success"
              type="submit"
              size="lg"
              className="flex-1"
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
