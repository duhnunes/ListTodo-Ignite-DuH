'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer relative size-4 shrink-0 rounded-full border border-blue-light transition-all hover:border-blue-dark outline-none focus:border-purple-dark focus:ring-2 placeholder:select-none focus:ring-purple-dark disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-purple-dark data-[state=checked]:border-purple-dark data-[state=checked]:hover:border-purple-light data-[state=checked]:hover:bg-purple-light data-[state=checked]:text-gray-100',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
