"use client"

import { CreateTodoSchema, Todo, TodoContext } from "@/src/entity/todo"
import { useSearchParams } from "next/navigation"
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { v4 } from "uuid"

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("q") || ""
  const completedFilter = searchParams.get("completed")

  useEffect(() => {
    const stringifyTodos = localStorage.getItem("todos")
    if (stringifyTodos) {
      try {
        const parsed = JSON.parse(stringifyTodos)
        const restoredTodos = parsed.map((t: Todo) => ({
          ...t,
          createdAt: new Date(t.createdAt),
        }))
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTodos(restoredTodos)
      } catch (e) {
        console.error("Помилка парсингу localStorage", e)
      }
    }

    setIsLoading(false)
  }, [])

  const addTodo = useCallback((todo: CreateTodoSchema) => {
    setTodos((prev) => {
      const newTodos = [
        ...prev,
        {
          ...todo,
          id: v4(),
          isCompleted: false,
          createdAt: new Date(),
        },
      ]

      localStorage.setItem("todos", JSON.stringify(newTodos))
      return newTodos
    })
  }, [])

  const deleteTodo = useCallback((todoId: string) => {
    setTodos((prev) => {
      const newTodos = prev.filter((todo) => todo.id !== todoId)

      localStorage.setItem("todos", JSON.stringify(newTodos))
      return newTodos
    })
  }, [])

  const toggleTodo = useCallback((todoId: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )

      localStorage.setItem("todos", JSON.stringify(newTodos))
      return newTodos
    })
  }, [])

  const filteredTodos = useMemo(() => {
    let result = todos

    if (completedFilter === "true") {
      result = result.filter((todo) => todo.isCompleted)
    } else if (completedFilter === "false") {
      result = result.filter((todo) => !todo.isCompleted)
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(lowerQuery) ||
          todo.description?.toLowerCase().includes(lowerQuery)
      )
    }

    return result
  }, [todos, searchQuery, completedFilter])

  const values = useMemo(
    () => ({
      values: {
        todos: filteredTodos,
        isLoading,
      },
      actions: {
        addTodo,
        deleteTodo,
        toggleTodo,
      },
    }),
    [filteredTodos, isLoading, addTodo, deleteTodo, toggleTodo]
  )

  return <TodoContext value={values}>{children}</TodoContext>
}
