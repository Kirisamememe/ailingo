import type { ComponentProps, FC } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const captionVariants = cva("", {
  variants: {
    size: {
      10: "text-[0.625rem]",
      12: "text-xs",
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
      1.1: "leading-[110%]",
      1.2: "leading-[120%]",
      1.35: "leading-[135%]",
      1.5: "leading-[150%]",
      1.65: "leading-[165%]",
      1.8: "leading-[180%]",
      2: "leading-[200%]",
    },
    weight: {
      200: "font-extralight",
      300: "font-light",
      400: "font-normal",
      500: "font-medium",
      600: "font-semibold",
      700: "font-bold",
      800: "font-extrabold",
      900: "font-black",
    },
    color: {
      foreground: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
    },
    mx: {
      0.5: "mx-0.5",
      1: "mx-1",
      1.5: "mx-1.5",
      2: "mx-2",
      3: "mx-3",
    },
    mt: {
      0.5: "mt-0.5",
      1: "mt-1",
      1.5: "mt-1.5",
      2: "mt-2",
      3: "mt-3",
    },
    mb: {
      0.5: "mb-0.5",
      1: "mb-1",
      1.5: "mb-1.5",
      2: "mb-2",
      3: "mb-3",
    },
  },
  defaultVariants: {
    size: 12,
    color: "muted",
    weight: 400,
  },
});

export const Caption: FC<ComponentProps<"span"> & VariantProps<typeof captionVariants>> = ({
  className,
  children,
  size,
  height,
  weight,
  color,
  mx,
  mt,
  mb,
  ref,
  ...props
}) => (
  <span
    ref={ref}
    className={cn(captionVariants({ size, height, weight, color, mx, mt, mb }), className)}
    {...props}
  >
    {children}
  </span>
);
