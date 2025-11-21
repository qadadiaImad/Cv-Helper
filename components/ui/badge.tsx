import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold leading-none transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 hover:border-primary/30 dark:bg-primary/20 dark:border-primary/30",
        secondary: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 hover:border-orange-300 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800",
        destructive: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15 hover:border-destructive/30 dark:bg-destructive/20 dark:border-destructive/30",
        outline: "text-foreground border-border hover:bg-secondary/50 hover:border-primary/30",
        success: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
