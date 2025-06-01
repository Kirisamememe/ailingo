import { Flexbox } from "@/components/ui/flexbox";

type Props = {
  children: React.ReactNode;
} & React.ComponentPropsWithRef<typeof Flexbox>;

/**
 * InsetLayoutNoPadding
 */
export const InsetLayoutNoPadding: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Flexbox className="h-full" {...props}>
      {children}
    </Flexbox>
  );
};
