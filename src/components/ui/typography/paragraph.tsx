import type { ComponentProps, FC } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const paragraphVariants = cva("", {
  variants: {
    size: {
      12: "text-xs",
      14: "text-sm",
      16: "text-base",
      18: "text-lg",
      20: "text-xl",
      24: "text-2xl",
    },
    height: {
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
    },
    color: {
      foreground: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
    },
    mt: {
      0.5: "mt-0.5",
      1: "mt-1",
      1.5: "mt-1.5",
      2: "mt-2",
      3: "mt-3",
      4: "mt-4",
      5: "mt-5",
      6: "mt-6",
    },
    mb: {
      0.5: "mb-0.5",
      1: "mb-1",
      1.5: "mb-1.5",
      2: "mb-2",
      3: "mb-3",
      4: "mb-4",
      5: "mb-5",
      6: "mb-6",
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
    size: 14,
    color: "foreground",
    weight: 400,
  },
});

type Props = {
  noWrap?: boolean;
} & ComponentProps<"p"> &
  VariantProps<typeof paragraphVariants>;

export const Paragraph: FC<Props> = ({
  className,
  children,
  size,
  height,
  weight,
  color,
  mt,
  mb,
  clamp,
  noWrap = false,
  ...props
}) => (
  <p
    className={cn(
      paragraphVariants({ size, height, weight, color, mt, mb, clamp }),
      noWrap && "text-nowrap",
      className,
    )}
    {...props}
  >
    {children}
  </p>
);
