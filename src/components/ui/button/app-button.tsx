import type { FC } from "react";
import { Button as ButtonBase } from "./button";

type ButtonProps = React.ComponentProps<typeof ButtonBase>;

/**
 * AppButton component
 */
export const Button: FC<ButtonProps> = (props) => {
  return <ButtonBase {...props}>{props.children}</ButtonBase>;
};
