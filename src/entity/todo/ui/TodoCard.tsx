import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui"
import { cn } from "@/src/shared/utils"
import { CircleCheck } from "lucide-react"
import { Todo } from "../model/schemas/todo.schema"

interface TodoCardProps {
  todo: Todo
}

export const TodoCard = ({ todo }: TodoCardProps) => {
  const formattedDate = new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(todo.createdAt))

  return (
    <Card
      className={cn(
        "h-45 w-72.5 dark:border-neutral-800 dark:bg-neutral-900",

        todo.isCompleted && "bg-neutral-50 opacity-75 dark:bg-neutral-900/50"
      )}
    >
      <CardHeader className="px-2!">
        <CardTitle
          className={cn(
            "line-clamp-1",
            todo.isCompleted && "flex items-center gap-2 text-green-700"
          )}
        >
          {todo.isCompleted && <CircleCheck size={16} />}
          {todo.title}
        </CardTitle>
      </CardHeader>

      <CardDescription className="line-clamp-3 px-2 text-sm break-words whitespace-pre-wrap text-muted-foreground">
        {todo.description || "Опис відсутній"}
      </CardDescription>

      <CardFooter className="mt-auto flex items-center justify-between px-2">
        <span className="text-xs text-neutral-400 dark:text-neutral-500">
          {formattedDate}
        </span>
      </CardFooter>
    </Card>
  )
}
