import type { ComponentPropsWithRef, FC } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { generalStyles } from "./variant-styles";

type DivProps = ComponentPropsWithRef<"div">;

const flexColumnVariants = cva(
  "flex flex-col min-w-4 min-h-4 ring-offset-background ring-offset-2 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2",
  {
    variants: {
      ...generalStyles,
    },
  },
);

type FlexColumnProps = {
  className?: string;
  border?: boolean;
  bg?: boolean;
  shadow?: boolean;
  trans?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  center?: boolean;
} & VariantProps<typeof flexColumnVariants> &
  DivProps;

/**
 * 垂直方向のFlexboxコンポーネント
 */
const FlexColumn: FC<FlexColumnProps> = ({
  className,
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
    {...props}
    className={cn(
      flexColumnVariants({ radius, gap, p, px, py }),
      border && "border",
      bg && "bg-card",
      shadow && "shadow-sm",
      trans && "transition-all",
      centerX && "items-center",
      centerY && "justify-center",
      center && "items-center justify-center",
      className,
    )}
    {...props}
  />
);
FlexColumn.displayName = "FlexColumn";

export { FlexColumn };
