import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans text-sm font-medium transition-[background-color,color,border-color,transform,opacity] duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-jade text-ink hover:bg-jade-glow active:scale-[0.98]",
        outline:
          "border border-line-strong text-paper hover:border-jade hover:text-jade",
        ghost: "text-paper-dim hover:text-paper",
        glass:
          "glass text-paper hover:border-jade/60 hover:text-jade",
        whatsapp:
          "border border-jade/40 bg-jade/10 text-jade hover:bg-jade hover:text-ink",
      },
      size: {
        // 44px minimum touch target on every size.
        sm: "h-11 px-5",
        md: "h-12 px-7",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
