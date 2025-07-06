"use client";

import { useState } from "react";
import { SquarePenIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FlexColumn } from "@/components/ui/flexbox";

/**
 * 作文修正リクエストフォーム
 */
export const RequestFormButton = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <FlexColumn
      className={cn(
        "bg-card absolute right-8 bottom-10 size-14 rounded-[28px] border transition-all [transition-property:border-radius,width,height] duration-300",
        expanded && "h-72 w-92 rounded-2xl md:w-128",
      )}
    >
      <Button
        variant="ghost"
        className={cn("absolute right-0 bottom-0 size-14 rounded-full")}
        size="icon"
        type="button"
        onClick={() => {
          setExpanded((prev) => !prev);
        }}
      >
        <SquarePenIcon
          className={cn(
            "absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
            expanded && "rotate-90 opacity-0",
          )}
        />
        <X
          className={cn(
            "absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 -rotate-90 opacity-0 transition-all duration-300",
            expanded && "rotate-0 opacity-100",
          )}
        />
      </Button>
    </FlexColumn>
  );
};
