import { CreateTodo } from "@/src/features/create-todo"
import { ListTodo } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./ToggleTheme"

export const Header = () => {
  return (
    <header className="py-2 dark:bg-neutral-900">
      <nav className="container mx-auto flex items-center justify-between px-2">
        <Link href="/" className="item-csenter flex gap-1 font-semibold">
          <span>TodoList</span>
          <ListTodo />
        </Link>

        <div className="flex items-center gap-4">
          <CreateTodo />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
