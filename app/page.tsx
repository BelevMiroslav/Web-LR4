import { FilterTodo } from "@/src/features/filter-todo"
import { SearchTodo } from "@/src/features/search-todo"
import { TodoList } from "@/src/widgets/todo-list"
import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense fallback = {<div></div>}>
      <section className="container mx-auto mt-5 px-2">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <SearchTodo />

          <FilterTodo />
        </div>

        <TodoList />
      </section>
    </Suspense>
  )
}
