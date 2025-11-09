import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, style, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-10 w-full min-w-0 rounded-lg border-2 bg-background px-4 py-3 text-sm shadow-sm transition-all duration-200 ease-in-out outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus:ring-2 focus:ring-offset-0',
        'hover:shadow-md',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        className,
      )}
      style={{
        borderColor: 'var(--theme-accent)',
        borderWidth: '2px',
        '--tw-ring-color': 'var(--theme-accent)',
        '--tw-ring-opacity': '0.3',
        ...style,
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Input }
