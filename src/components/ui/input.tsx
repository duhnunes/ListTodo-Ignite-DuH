import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-lg bg-gray-500 p-4 text-gray-100 shadow-input placeholder-gray-300 placeholder:italic transition-all duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium outline-none focus:border-purple-dark focus:ring-2 placeholder:select-none focus:ring-purple-dark disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
