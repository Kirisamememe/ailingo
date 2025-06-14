import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../select";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./form";

type Props = {
  label?: string;
  hiddenLabel?: boolean;
  description: string;
  hiddenDescription?: boolean;
  placeholder: string;
  className?: string;
} & React.ComponentProps<typeof Select>;

export const SelectFormItem: React.FC<Props> = ({
  label,
  hiddenLabel = true,
  description,
  hiddenDescription = true,
  children,
  placeholder,
  className,
  ...props
}) => {
  return (
    <FormItem>
      <FormLabel hidden={hiddenLabel}>{label}</FormLabel>
      <Select {...props}>
        <FormControl>
          <SelectTrigger
            className={cn(
              "data-[placeholder]:hover:text-foreground h-16 cursor-pointer rounded-sm",
              className,
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>{children}</SelectContent>
      </Select>
      <FormDescription hidden={hiddenDescription}>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
