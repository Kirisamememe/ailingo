import type { ComponentPropsWithRef, FC } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { generalStyles } from "./variant-styles";

type DivProps = ComponentPropsWithRef<"div">;

const flexboxVariants = cva(
  "min-w-4 min-h-4 ring-offset-background ring-offset-2 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2",
  {
    variants: {
      orientation: {
        vertical: "flex flex-col",
        horizontal: "flex",
      },
      ...generalStyles,
    },
  },
);

type FlexboxProps = {
  border?: boolean;
  bg?: boolean;
  shadow?: boolean;
  trans?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  center?: boolean;
} & VariantProps<typeof flexboxVariants> &
  DivProps;

/**
 * 双方向のFlexboxコンポーネント
 */
const Flexbox: FC<FlexboxProps> = ({
  className,
  orientation = "vertical",
  radius,
  gap,
  p,
  px,
  py,
  border = false,
  bg = false,
  shadow = false,
  trans = false,
  centerX = false,
  centerY = false,
  center = false,
  ref,
  ...props
}) => (
  <div
    ref={ref}
    className={cn(
      flexboxVariants({ orientation, radius, gap, p, px, py }),
      border && "border",
      bg && "bg-card",
      shadow && "shadow-sm",
      trans && "transition-all",
      centerX && orientation === "horizontal" && "justify-center",
      centerY && orientation === "horizontal" && "items-center",
      centerX && orientation === "vertical" && "items-center",
      centerY && orientation === "vertical" && "justify-center",
      center && "items-center justify-center",
      className,
    )}
    {...props}
  />
);

export { Flexbox };
