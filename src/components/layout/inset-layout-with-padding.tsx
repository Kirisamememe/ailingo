import { cn } from "@/lib/utils";
import { Flexbox } from "@/components/ui/flexbox";

type Props = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * InsetLayoutWithPadding
 */
export const InsetLayoutWithPadding: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <Flexbox
      className={cn("appear h-full gap-4 @[36rem]:px-4 @[36rem]:pb-4", className)}
      {...props}
    >
      {children}
    </Flexbox>
  );
};
