import type { FC } from "react";
import { Button as ButtonBase } from "./button";

type ButtonProps = React.ComponentProps<typeof ButtonBase>;

/**
 * MyButton component
 */
const Button: FC<ButtonProps> = (props) => {
  return <ButtonBase {...props}>My Button</ButtonBase>;
};

export default Button;
