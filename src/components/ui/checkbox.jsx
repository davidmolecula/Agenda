"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "/src/lib/utils"

const Checkbox = React.forwardRef(({ className,onCheckedChange, children, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 text-white shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  data-[state=checked]:text-white  ",
      className
    )}
    onCheckedChange={onCheckedChange}
    {...props}>
    <span className="text-sm font-medium">{children}</span>

  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
