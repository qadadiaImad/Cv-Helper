import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold 
   transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 
   [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 
   outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 
   transform hover:scale-105 active:scale-95`,
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/30",
        destructive:
          "bg-destructive text-white shadow-lg shadow-destructive/25 hover:bg-destructive/90 hover:shadow-destructive/30",
        outline: "border border-border bg-background hover:bg-secondary/80 hover:border-primary/30 shadow-sm",
        secondary:
          "bg-secondary text-primary border border-border hover:bg-secondary/80 hover:border-primary/30 shadow-sm",
        ghost: "hover:bg-secondary/60 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline hover:scale-100",
      },
      size: {
        default: "h-10 px-6 py-3 has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-lg px-8 has-[>svg]:px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
