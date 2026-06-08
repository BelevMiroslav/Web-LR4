import { z } from "zod/v4"
import { MAX_DESCRIPTION_LENGTH, MIN_TITLE_LENGTH } from "../const"

export const todoSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(
      MIN_TITLE_LENGTH,
      `Назва повинна містити щонайменше ${MIN_TITLE_LENGTH} символів`
    ),
  description: z
    .string()
    .max(
      MAX_DESCRIPTION_LENGTH,
      `Опис не може перевищувати ${MAX_DESCRIPTION_LENGTH} символів`
    ),
  isCompleted: z.boolean().default(false),
  createdAt: z.date(),
})

export const createTodoSchema = todoSchema.omit({
  id: true,
  createdAt: true,
  isCompleted: true,
})

export type Todo = z.infer<typeof todoSchema>
export type CreateTodoSchema = z.infer<typeof createTodoSchema>
