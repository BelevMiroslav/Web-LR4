"use client"

import { useDebounce } from "@/src/shared/hooks"
import { Button, Input } from "@/src/shared/ui"
import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const SearchTodo = () => {
  const searchParams = useSearchParams()
  const [value, setValue] = useState(() => searchParams.get("q") || "")
  const { replace } = useRouter()
  const pathname = usePathname()

  const dvalue = useDebounce(value, 700)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (dvalue) {
      params.set("q", dvalue)
    } else {
      params.delete("q")
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [dvalue, pathname, replace])

  return (
    <div className="relative flex w-full max-w-xs items-center rounded-lg border border-border bg-input px-3 py-1.5 transition-shadow focus-within:border-primary focus-within:ring-2 focus-within:ring-ring sm:max-w-sm">
      <Search
        size={18}
        className="shrink-0 text-muted-foreground select-none"
      />

      <Input
        className="h-auto w-full border-0 bg-transparent! p-0 pr-8 pl-2 text-sm outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Пошук задач..."
      />

      {value && (
        <Button
          onClick={() => setValue("")}
          className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
          size="icon"
          variant="ghost"
        >
          <X size={16} />
        </Button>
      )}
    </div>
  )
}
