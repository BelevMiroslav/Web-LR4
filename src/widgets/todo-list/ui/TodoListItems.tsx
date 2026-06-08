"use client"

import { Todo, TodoCard, useTodo } from "@/src/entity/todo"
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/shared/ui"
import { Check, Trash2 } from "lucide-react"
import { useState } from "react"

export const TodoListItem = ({ todo }: { todo: Todo }) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    actions: { deleteTodo, toggleTodo },
  } = useTodo()

  const formattedDate = new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(todo.createdAt))

  return (
    <li>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <div className="cursor-pointer transition-opacity hover:opacity-80">
            <TodoCard todo={todo} />
          </div>
        </DrawerTrigger>

        <DrawerContent className="mx-auto max-w-2xl px-2 pb-4 sm:px-4">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-2xl">{todo.title}</DrawerTitle>
            <DrawerDescription className="mt-4 text-base break-words whitespace-pre-wrap text-muted-foreground">
              {todo.description || " Опис відсутній"}
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 py-4 text-sm text-muted-foreground">
            <p>Створено: {formattedDate}</p>
            <p>Статус: {todo.isCompleted ? "Виконано" : "Не виконано"}</p>
          </div>

          <DrawerFooter className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="destructive"
              onClick={() => {
                deleteTodo(todo.id)
                setIsOpen(false)
              }}
              className="sm:w-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Видалити
            </Button>

            <Button
              variant={todo.isCompleted ? "secondary" : "success"}
              onClick={() => {
                toggleTodo(todo.id)
                setIsOpen(false)
              }}
              className="sm:w-auto"
            >
              <Check className="mr-2 h-4 w-4" />
              {todo.isCompleted ? "Повернути в роботу" : "Виконати"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </li>
  )
}
