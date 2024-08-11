/* eslint-disable @typescript-eslint/no-explicit-any */

import { DialogClose } from '@radix-ui/react-dialog'
import { Eye, Pencil, X } from 'lucide-react'
import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { AddTodoContext, CreateAddTodoData } from '@/contexts/ListTodoContext'

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

export function EditTask({ id, task }: CreateAddTodoData) {
  const {
    handleEditTask,
    inputValue,
    setInputValue,
    countCharacter,
    setCountCharacter,
    halfCharacter,
    maxCharacter,
    almostMaxCharacter,
  } = useContext(AddTodoContext)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPreviewMarkdown, setIsPreviewMarkdown] = useState(false)

  const handleSave = () => {
    if (!inputValue) {
      return
    }

    handleEditTask(id)
    setIsDialogOpen(false)
  }

  const { register, control, reset, handleSubmit } = useForm()

  function handleClose() {
    reset()
    setCountCharacter(0)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Editar tarefa"
          onClick={() => setIsDialogOpen(true)}
        >
          <Pencil className="size-4" />
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
          onSubmit={handleSubmit(handleSave)}
          className="mx-auto flex flex-col gap-4 w-full max-sm:gap-7"
        >
          <DialogHeader>
            <DialogTitle className="text-gray-100">Editar tarefa</DialogTitle>
            <DialogDescription>
              Faça alterações na sua task aqui. Clique em salvar quando
              terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="relative flex-1 rounded-lg bg-gray-500 text-gray-100 text-sm transition-all duration-150 ring-offset-background placeholder:text-gray-300  outline-none placeholder:select-none focus:border-purple-dark focus:ring-2  focus:ring-purple-dark group">
            {isPreviewMarkdown ? (
              <div className="p-3 max-h-[550px] overflow-auto whitespace-break-spaces break-words">
                <Markdown
                  task={task}
                  id={id}
                  countCharacterTotal={countCharacter}
                />
              </div>
            ) : (
              <Controller
                name="editTask"
                control={control}
                defaultValue={task}
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
                    {...register('editTask', {
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
