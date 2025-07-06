import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../select";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./form";
import type { LanguageCode } from "@/types";

type Props = {
  label?: string;
  hiddenLabel?: boolean;
  description: string;
  hiddenDescription?: boolean;
  placeholder: string;
  className?: string;
  parentClass?: string;
  variant?: "default" | "ghost";
  lang?: LanguageCode;
} & React.ComponentProps<typeof Select>;

export const SelectFormItem: React.FC<Props> = ({
  label,
  hiddenLabel = false,
  description,
  hiddenDescription = true,
  children,
  placeholder,
  className,
  parentClass,
  variant = "default",
  lang,
  ...props
}) => {
  const variantClass = useMemo(() => {
    switch (variant) {
      case "ghost":
        return "text-muted-foreground hover:text-foreground w-fit border-none bg-transparent px-1 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent";
      default:
        return "";
    }
  }, [variant]);

  return (
    <FormItem className={cn("h-fit w-full", parentClass)}>
      <FormLabel hidden={hiddenLabel} className="shrink-0 px-1 font-semibold">
        {label}
      </FormLabel>
      <Select {...props}>
        <FormControl>
          <SelectTrigger
            className={cn(
              "data-[placeholder]:hover:text-foreground h-16 w-full cursor-pointer rounded-sm",
              variantClass,
              className,
            )}
          >
            <SelectValue placeholder={placeholder} lang={lang} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>{children}</SelectContent>
      </Select>
      <FormDescription hidden={hiddenDescription} className="shrink-0">
        {description}
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};
