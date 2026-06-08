"use client"

import { use } from "react"
import { TodoContext } from "./todo.context"

export const useTodo = () => {
  const ctx = use(TodoContext)

  if (!ctx) {
    throw new Error("TodoContext is not provided")
  }

  return ctx
}
