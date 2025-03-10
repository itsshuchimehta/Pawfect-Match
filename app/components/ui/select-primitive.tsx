import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"

export const Portal = SelectPrimitive.Portal

export const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Content ref={ref} {...props}>
    {children}
  </SelectPrimitive.Content>
))
Content.displayName = "Content"

export const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} {...props}>
    {children}
  </SelectPrimitive.Trigger>
))
Trigger.displayName = "Trigger"

export const Value = SelectPrimitive.Value

export const Icon = SelectPrimitive.Icon

export const Group = SelectPrimitive.Group

export const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} {...props}>
    {children}
  </SelectPrimitive.Item>
))
Item.displayName = "Item"

export const ItemIndicator = SelectPrimitive.ItemIndicator

export const ItemText = SelectPrimitive.ItemText

export const Separator = SelectPrimitive.Separator

export const Viewport = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Viewport ref={ref} {...props}>
    {children}
  </SelectPrimitive.Viewport>
))
Viewport.displayName = "Viewport"

export const Label = SelectPrimitive.Label

export const Root = SelectPrimitive.Root

