import type { DeepPartial } from "ai";
import { useTranslations } from "next-intl";
import { FlexColumn } from "@/components/ui/flexbox";
import { Headline, Paragraph } from "@/components/ui/typography";
import type { CompositionCorrectionDBRequestSchema } from "../../_schema";

/**
 * 作文修正結果
 */
type Props = {
  object?: DeepPartial<CompositionCorrectionDBRequestSchema>;
};

/**
 * 作文修正結果
 */
export const Corrected: React.FC<Props> = ({ object }) => {
  const t = useTranslations("compositionCorrection.requestForm.corrected");
  return (
    <FlexColumn className="bg-card/50 w-full rounded-lg border p-4">
      <Headline size={20} mx={1}>
        {t("title")}
      </Headline>
      {object?.corrected && (
        <FlexColumn gap={4} className="h-full min-h-36 w-full overflow-y-scroll rounded-sm">
          <Paragraph>{object.corrected}</Paragraph>
          <Paragraph className="text-muted-foreground whitespace-pre-wrap">
            {object.feedback}
          </Paragraph>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};
