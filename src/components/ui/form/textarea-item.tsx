import { cn } from "@/lib/utils";
import { FormControl, FormDescription, FormItem, FormLabel } from "./form";
import { FormMsg } from "./form-msg";
import { Textarea } from "./textarea";

type Props = {
  label?: string;
  hiddenLabel?: boolean;
  description: string;
  hiddenDescription?: boolean;
  parentClass?: string;
  i18nNameSpace: string;
} & React.ComponentProps<typeof Textarea>;

export const TextareaItem: React.FC<Props> = ({
  label,
  hiddenLabel = false,
  description,
  hiddenDescription = true,
  className,
  parentClass,
  i18nNameSpace,
  ...props
}) => {
  return (
    <FormItem className={cn("h-fit", parentClass)}>
      <FormLabel hidden={hiddenLabel} className="px-1 font-semibold">
        {label}
      </FormLabel>
      <FormControl>
        <Textarea className={cn("resize-none rounded-sm", className)} {...props} />
      </FormControl>
      <FormDescription hidden={hiddenDescription}>{description}</FormDescription>
      <FormMsg i18nNameSpace={i18nNameSpace} />
    </FormItem>
  );
};
