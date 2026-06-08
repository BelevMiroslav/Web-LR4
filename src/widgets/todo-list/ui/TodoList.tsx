"use client"

import { useTodo } from "@/src/entity/todo"
import { Spinner } from "@/src/shared/ui"
import { cn } from "@/src/shared/utils"
import { Inbox } from "lucide-react"
import { TodoListItem } from "./TodoListItems"

export const TodoList = () => {
  const {
    values: { todos, isLoading },
  } = useTodo()

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <Spinner />
      </div>
    )
  }

  if (!todos.length) {
    return (
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-2 text-muted-foreground">
        <Inbox size={52} />
        <p>Ще немає задач</p>
      </div>
    )
  }

  return (
    <ul
      className={cn(
        "mt-4 flex flex-wrap items-stretch justify-center gap-4",
        todos.length < 8 && "justify-normal"
      )}
    >
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
