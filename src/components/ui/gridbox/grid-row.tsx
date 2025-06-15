import type { ComponentPropsWithRef, FC } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gridRowVariants = cva(
  "grid grid-flow-col ring-offset-background ring-offset-2 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2",
  {
    variants: {
      grid: {
        1: "grid-rows-1",
        2: "grid-rows-2",
        3: "grid-rows-3",
        4: "grid-rows-4",
        5: "grid-rows-5",
        6: "grid-rows-6",
        7: "grid-rows-7",
        8: "grid-rows-8",
        9: "grid-rows-9",
        10: "grid-rows-10",
        11: "grid-rows-11",
        12: "grid-rows-12",
        sub: "grid-rows-subgrid",
      },
      sm: {
        1: "sm:grid-rows-1",
        2: "sm:grid-rows-2",
        3: "sm:grid-rows-3",
        4: "sm:grid-rows-4",
        5: "sm:grid-rows-5",
        6: "sm:grid-rows-6",
        7: "sm:grid-rows-7",
        8: "sm:grid-rows-8",
        9: "sm:grid-rows-9",
        10: "sm:grid-rows-10",
        11: "sm:grid-rows-11",
        12: "sm:grid-rows-12",
      },
      md: {
        1: "md:grid-rows-1",
        2: "md:grid-rows-2",
        3: "md:grid-rows-3",
        4: "md:grid-rows-4",
        5: "md:grid-rows-5",
        6: "md:grid-rows-6",
        7: "md:grid-rows-7",
        8: "md:grid-rows-8",
        9: "md:grid-rows-9",
        10: "md:grid-rows-10",
        11: "md:grid-rows-11",
        12: "md:grid-rows-12",
      },
      lg: {
        1: "lg:grid-rows-1",
        2: "lg:grid-rows-2",
        3: "lg:grid-rows-3",
        4: "lg:grid-rows-4",
        5: "lg:grid-rows-5",
        6: "lg:grid-rows-6",
        7: "lg:grid-rows-7",
        8: "lg:grid-rows-8",
        9: "lg:grid-rows-9",
        10: "lg:grid-rows-10",
        11: "lg:grid-rows-11",
        12: "lg:grid-rows-12",
      },
      xl: {
        1: "xl:grid-rows-1",
        2: "xl:grid-rows-2",
        3: "xl:grid-rows-3",
        4: "xl:grid-rows-4",
        5: "xl:grid-rows-5",
        6: "xl:grid-rows-6",
        7: "xl:grid-rows-7",
        8: "xl:grid-rows-8",
        9: "xl:grid-rows-9",
        10: "xl:grid-rows-10",
        11: "xl:grid-rows-11",
        12: "xl:grid-rows-12",
      },
      xxl: {
        1: "2xl:grid-rows-1",
        2: "2xl:grid-rows-2",
        3: "2xl:grid-rows-3",
        4: "2xl:grid-rows-4",
        5: "2xl:grid-rows-5",
        6: "2xl:grid-rows-6",
        7: "2xl:grid-rows-7",
        8: "2xl:grid-rows-8",
        9: "2xl:grid-rows-9",
        10: "2xl:grid-rows-10",
        11: "2xl:grid-rows-11",
        12: "2xl:grid-rows-12",
      },
      gap: {
        0.5: "gap-0.5",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        8: "gap-8",
        10: "gap-10",
      },
      radius: {
        base: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      p: {
        1: "p-1",
        2: "p-2",
        3: "p-3",
        4: "p-4",
        5: "p-5",
        6: "p-6",
        7: "p-7",
        8: "p-8",
      },
      px: {
        1: "px-1",
        2: "px-2",
        3: "px-3",
        4: "px-4",
        5: "px-5",
        6: "px-6",
        7: "px-7",
        8: "px-8",
      },
      py: {
        1: "py-1",
        2: "py-2",
        3: "py-3",
        4: "py-4",
        5: "py-5",
        6: "py-6",
        7: "py-7",
        8: "py-8",
      },
    },
    defaultVariants: {
      gap: 4,
      radius: "lg",
      grid: 1,
    },
  },
);

type RowProps = {
  border?: boolean;
  bg?: boolean;
  trans?: boolean;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};

const GridRow: FC<
  ComponentPropsWithRef<"div"> & VariantProps<typeof gridRowVariants> & RowProps
> = ({
  className,
  grid,
  sm,
  md,
  lg,
  xl,
  xxl,
  radius,
  gap,
  p,
  px,
  py,
  border = false,
  bg = false,
  trans = false,
  ref,
  ...props
}) => (
  <div
    ref={ref}
    className={cn(
      gridRowVariants({ grid, sm, md, lg, xl, xxl, radius, gap, p, px, py }),
      border && "border",
      bg && "bg-card",
      trans && "transition-all",
      className,
    )}
    {...props}
  />
);

export { GridRow };
