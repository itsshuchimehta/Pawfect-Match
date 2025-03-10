"use client"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronsUpDown } from "lucide-react"
import React from "react"

interface MultiSelectProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

export default React.memo(function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  onOpenChange,
  open,
}: MultiSelectProps) {
  const handleSelect = (option: string) => {
    const newSelected = selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]
    onChange(newSelected)
  }

  return (
    <Popover open={open ?? false} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open ?? false}
          className="w-full justify-between h-10 px-3 font-normal bg-background border-input hover:bg-accent hover:text-accent-foreground"
        >
          <div className="flex-1 text-left">
            {selected.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              <span>{selected.length} selected</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0"
        align="start"
        side="bottom"
        sideOffset={4}
        alignOffset={0}
        avoidCollisions={false}
      >
        <Command>
          <CommandInput placeholder="Search breeds..." className="h-8" />
          <CommandList>
            <CommandEmpty>No breed found.</CommandEmpty>
            <CommandGroup className="max-h-40 overflow-auto">
              {options.sort().map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => handleSelect(option)}
                  className="flex items-center gap-2 px-2 py-1"
                >
                  <div
                    className={`flex h-3 w-3 items-center justify-center rounded border ${
                      selected.includes(option)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-primary/20 bg-transparent"
                    }`}
                  >
                    {selected.includes(option) && <Check className="h-2 w-2" />}
                  </div>
                  <span className="text-sm">{option}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
})

