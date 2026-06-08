"use client"

import {
  createTodoSchema,
  MAX_DESCRIPTION_LENGTH,
  useTodo,
  type CreateTodoSchema,
} from "@/src/entity/todo"
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
} from "@/src/shared/ui"
import { Textarea } from "@/src/shared/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useId, useState } from "react"
import { Controller, useForm } from "react-hook-form"

export const CreateTodo = () => {
  const {
    actions: { addTodo },
  } = useTodo()
  const [isOpen, setOpen] = useState(false)
  const formId = useId()

  const { control, formState, reset, handleSubmit } = useForm<CreateTodoSchema>(
    {
      defaultValues: {
        title: "",
        description: "",
      },
      resolver: zodResolver(createTodoSchema),
    }
  )

  const { errors, isDirty, isValid } = formState

  const isDisabled = !isDirty || !isValid

  const handleClose = () => {
    reset()
    setOpen(false)
  }

  const onSubmit = (data: CreateTodoSchema) => {
    addTodo(data)
    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Додати
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Нова задача</DialogTitle>
        </DialogHeader>

        <form id={formId} onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="todo-title">
                      Назва <span className="text-red-500">*</span>
                    </FieldLabel>
                    <FieldContent>
                      <Input id="todo-title" placeholder="Назва" {...field} />
                    </FieldContent>
                    <FieldError errors={[errors.title]} />
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="todo-description">Опис</FieldLabel>
                    <FieldContent className="relative">
                      <Textarea
                        id="todo-description"
                        className="h-40 resize-none"
                        placeholder="Опис"
                        {...field}
                        maxLength={MAX_DESCRIPTION_LENGTH}
                      />
                      {field.value && (
                        <span className="absolute right-2 bottom-2 rounded-md bg-neutral-100 p-1 text-xs dark:bg-neutral-800">
                          {`${field.value.length} /  ${MAX_DESCRIPTION_LENGTH}`}
                        </span>
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </form>

        <DialogFooter className="flex flex-row items-center justify-end gap-4 px-2!">
          <Button onClick={handleClose} variant="ghost">
            Скасувати
          </Button>
          <Button form={formId} disabled={isDisabled}>
            Створити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
