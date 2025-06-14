import type { FC } from "react";
import { cn } from "@/lib/utils";
import { Button as ButtonBase } from "./button";

type ButtonProps = React.ComponentProps<typeof ButtonBase>;

/**
 * AppButton component
 */
export const Button: FC<ButtonProps> = ({ className, ...props }) => {
  return <ButtonBase className={cn("cursor-pointer rounded-sm", className)} {...props} />;
};
