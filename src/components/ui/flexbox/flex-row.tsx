import type { ComponentPropsWithRef, FC } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { generalStyles } from "./variant-styles";

type DivProps = ComponentPropsWithRef<"div">;

const flexRowVariants = cva(
  "flex min-w-4 min-h-4 ring-offset-background ring-offset-2 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2",
  {
    variants: {
      ...generalStyles,
    },
  },
);

type FlexRowProps = {
  border?: boolean;
  bg?: boolean;
  shadow?: boolean;
  trans?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  center?: boolean;
} & VariantProps<typeof flexRowVariants> &
  DivProps;

/**
 * 水平方向のFlexboxコンポーネント
 */
const FlexRow: FC<FlexRowProps> = ({
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
    className={cn(
      flexRowVariants({ radius, gap, p, px, py }),
      border && "border",
      bg && "bg-card",
      shadow && "shadow-sm",
      trans && "transition-all",
      centerX && "justify-center",
      centerY && "items-center",
      center && "items-center justify-center",
      className,
    )}
    {...props}
  />
);
FlexRow.displayName = "FlexRow";

export { FlexRow };
