import type { ComponentProps, FC } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("", {
  variants: {
    size: {
      14: "text-sm",
      16: "text-base",
      18: "text-lg",
      20: "text-xl",
      24: "text-2xl",
      30: "text-3xl",
      36: "text-4xl",
      48: "text-5xl",
    },
    height: {
      1: "leading-[100%]",
      1.2: "leading-[120%]",
      1.5: "leading-[150%]",
    },
    weight: {
      400: "font-normal",
      500: "font-medium",
      600: "font-semibold",
      700: "font-bold",
      800: "font-extrabold",
      900: "font-black",
    },
    color: {
      foreground: "text-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
      muted: "text-muted-foreground",
    },
    py: {
      0.5: "py-0.5",
      1: "py-1",
      2: "py-2",
    },
    mx: {
      0.5: "mx-0.5",
      1: "mx-1",
      1.5: "mx-1.5",
      2: "mx-2",
      3: "mx-3",
    },
    mb: {
      0.5: "mb-0.5",
      1: "mb-1",
      2: "mb-2",
      3: "mb-3",
    },
    clamp: {
      1: "line-clamp-1",
      2: "line-clamp-2",
      3: "line-clamp-3",
      4: "line-clamp-4",
      5: "line-clamp-5",
      6: "line-clamp-6",
    },
  },
  defaultVariants: {
    size: 16,
    color: "foreground",
    weight: 700,
  },
});

export const Heading: FC<ComponentProps<"h6"> & VariantProps<typeof headingVariants>> = ({
  className,
  children,
  size,
  height,
  weight,
  color,
  py,
  mx,
  mb,
  clamp,
  ...props
}) => (
  <h6
    className={cn(headingVariants({ size, height, weight, color, py, mx, mb, clamp }), className)}
    {...props}
  >
    {children}
  </h6>
);
