"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

type SearchbarProps = {
  onSearch: (query: string) => void
}

export function Searchbar({ onSearch }: SearchbarProps) {
  const [query, setQuery] = useState<string>("")

  const handleSubmit = () => {
    onSearch(query)
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="search"
        placeholder="Sök efter fastigheter"
        className="flex-1"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSubmit} type="button">Sök</Button>
    </div>
  )
}
