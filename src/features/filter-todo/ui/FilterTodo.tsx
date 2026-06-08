"use client"

import { Button } from "@/src/shared/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const FilterTodo = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filterValue = searchParams.get("completed")

  const changeFilter = (value: "true" | "false" | "all") => {
    const params = new URLSearchParams(searchParams)

    if (value === "all") {
      params.delete("completed")
    } else {
      params.set("completed", value)
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <ul className="flex items-center gap-2">
      <li>
        <Button
          variant={filterValue === null ? "default" : "outline"}
          onClick={() => changeFilter("all")}
          size="sm"
        >
          Усі
        </Button>
      </li>
      <li>
        <Button
          variant={filterValue === "true" ? "default" : "outline"}
          onClick={() => changeFilter("true")}
          size="sm"
        >
          Виконані
        </Button>
      </li>
      <li>
        <Button
          variant={filterValue === "false" ? "default" : "outline"}
          onClick={() => changeFilter("false")}
          size="sm"
        >
          В процесі
        </Button>
      </li>
    </ul>
  )
}
