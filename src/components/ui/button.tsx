import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium border-none bg-none gap-2 transition-all duration-150 cursor-pointer  outline-none focus:border-purple-dark focus:ring-2 placeholder:select-none focus:ring-purple-dark shadow-input select-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-blue-dark text-gray-100 hover:bg-blue-light',
        destructive: 'bg-red-600 hover:bg-red-500',
        success:
          'bg-green-600 text-gray-100 hover:bg-green-500 hover:text-gray-600',
        outline:
          'hover:outline hover:outline-1 hover:outline-gray-400 hover:text-gray-100 outline-none  shadow-none',

        ghost: 'text-gray-300 hover:text-danger hover:bg-gray-400 shadow-none',
        input:
          'flex w-full rounded-lg bg-gray-500 shadow-input text-md transition-all duration-150 outline-none focus:border-purple-dark focus:ring-2 placeholder:select-none focus:ring-purple-dark',
      },
      size: {
        default: 'p-4',
        sm: 'p-1',
        lg: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
