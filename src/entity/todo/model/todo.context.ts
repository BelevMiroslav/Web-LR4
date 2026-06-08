"use client"

import { createContext } from "react"
import { CreateTodoSchema, Todo } from "./schemas/todo.schema"

interface TodoContext {
  values: {
    todos: Todo[]
    isLoading: boolean
  }
  actions: {
    addTodo: (todo: CreateTodoSchema) => void
    deleteTodo: (todoId: string) => void
    toggleTodo: (todoId: string) => void
  }
}

export const defaultValues: TodoContext = {
  values: {
    todos: [],
    isLoading: false,
  },
  actions: {
    addTodo: () => {},
    deleteTodo: () => {},
    toggleTodo: () => {},
  },
}

export const TodoContext = createContext(defaultValues)
