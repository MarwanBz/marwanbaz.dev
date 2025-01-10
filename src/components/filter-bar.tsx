import { Button } from "@/components/ui/button"

interface FilterBarProps {
  currentFilter: string
  onFilterChange: (filter: string) => void
}

export function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className=" relative flex space-x-2 bg-zinc-800 p-1 rounded-full">
      <Button
        variant={currentFilter === 'all' ? "default" : "ghost"}
        onClick={() => onFilterChange('all')}
        className="rounded-full text-sm font-medium"
          >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-500 to-black dark:from-white dark:to-gray-500" />
                        <div className="absolute inset-[3px] rounded-full bg-white dark:bg-black" />
        ALL
      </Button>
      <Button
        variant={currentFilter === 'web' ? "default" : "ghost"}
        onClick={() => onFilterChange('web')}
        className="rounded-full text-sm font-medium"
          >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-500 to-black dark:from-white dark:to-gray-500" />
                        <div className="absolute inset-[3px] rounded-full bg-white dark:bg-black" />
        WEB
      </Button>
      <Button
        variant={currentFilter === 'mobile' ? "default" : "ghost"}
        onClick={() => onFilterChange('mobile')}
        className="rounded-full text-sm font-medium"
          >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-500 to-black dark:from-white dark:to-gray-500" />
                        <div className="absolute inset-[3px] rounded-full bg-white dark:bg-black" />
        MOBILE
      </Button>
    </div>
  )
}

