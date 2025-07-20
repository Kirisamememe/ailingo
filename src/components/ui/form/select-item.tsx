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
} & React.ComponentProps<typeof Select> &
  React.ComponentProps<typeof SelectContent>;

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
        return "shadow-none text-muted-foreground hover:text-foreground w-fit border-none bg-transparent px-1 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent";
      default:
        return "";
    }
  }, [variant]);

  const variantParentClass = useMemo(() => {
    switch (variant) {
      case "ghost":
        return "flex gap-2";
      default:
        return "";
    }
  }, [variant]);

  const variantLabelClass = useMemo(() => {
    switch (variant) {
      case "ghost":
        return "font-normal text-muted-foreground";
      default:
        return "";
    }
  }, [variant]);

  return (
    <FormItem className={cn("h-fit w-full", variantParentClass, parentClass)}>
      <FormLabel
        hidden={hiddenLabel}
        className={cn("shrink-0 px-1 font-semibold", variantLabelClass)}
      >
        {label}
        {variant === "ghost" && " : "}
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
        <SelectContent
          align={props.align}
          alignOffset={props.alignOffset}
          side={props.side}
          sideOffset={props.sideOffset}
        >
          {children}
        </SelectContent>
      </Select>
      <FormDescription hidden={hiddenDescription} className="shrink-0">
        {description}
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};
