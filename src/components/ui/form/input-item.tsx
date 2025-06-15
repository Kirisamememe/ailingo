import { cn } from "@/lib/utils";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";

type Props = {
  label?: string;
  hiddenLabel?: boolean;
  description: string;
  hiddenDescription?: boolean;
} & React.ComponentProps<typeof Input>;

export const InputItem: React.FC<Props> = ({
  label,
  hiddenLabel = false,
  description,
  hiddenDescription = true,
  className,
  ...props
}) => {
  return (
    <FormItem className="w-full">
      <FormLabel hidden={hiddenLabel} className="px-1 font-semibold">
        {label}
      </FormLabel>
      <FormControl>
        <Input className={cn("h-10 rounded-sm", className)} {...props} />
      </FormControl>
      <FormDescription hidden={hiddenDescription}>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
