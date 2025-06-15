"use client";

import type { FC } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./app-button";

type Props = {
  isPending?: boolean;
} & React.ComponentPropsWithRef<typeof Button>;

const Submit: FC<Props> = ({ children, isPending = false, ref, ...props }) => {
  const { pending } = useFormStatus();
  const _pending = pending || isPending;

  return (
    <Button ref={ref} type="submit" {...props} disabled={_pending}>
      {_pending && <div className="circle-spin-2-invert scale-80" />}
      {children}
    </Button>
  );
};
Submit.displayName = "Submit";

export { Submit };
