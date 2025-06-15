import { cn } from "@/lib/utils";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./form";
import { Textarea } from "./textarea";

type Props = {
  label?: string;
  hiddenLabel?: boolean;
  description: string;
  hiddenDescription?: boolean;
} & React.ComponentProps<typeof Textarea>;

export const TextareaItem: React.FC<Props> = ({
  label,
  hiddenLabel = false,
  description,
  hiddenDescription = true,
  className,
  ...props
}) => {
  return (
    <FormItem>
      <FormLabel hidden={hiddenLabel}>{label}</FormLabel>
      <FormControl>
        <Textarea className={cn("h-10 resize-none rounded-sm", className)} {...props} />
      </FormControl>
      <FormDescription hidden={hiddenDescription}>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
