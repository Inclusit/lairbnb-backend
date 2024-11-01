import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Searchbar() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="search" placeholder="Search a lair" className="flex-1" />
      <Button type="submit">Search</Button>
    </div>
  )
}
