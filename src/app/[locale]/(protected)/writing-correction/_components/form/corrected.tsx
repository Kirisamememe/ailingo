import { formatDistanceToNow } from "date-fns";
import { useLocale, useTranslations } from "next-intl";
import { getLocaleForFns } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FlexColumn } from "@/components/ui/flexbox";
import { Separator } from "@/components/ui/separator";
import { Caption, Headline, Paragraph } from "@/components/ui/typography";
import { CorrectedCurrent } from "./corrected-current";
import type { Writing } from "@/types";

/**
 * 作文修正結果
 */
type Props = {
  writings: Writing[];
};

/**
 * 作文修正結果
 */
export const Corrected: React.FC<Props> = ({ writings }) => {
  const t = useTranslations("writingCorrection.corrected");
  const locale = useLocale();

  return (
    <FlexColumn gap={4} p={4}>
      <Headline size={20}>{t("title")}</Headline>
      <CorrectedCurrent />
      <Accordion type="multiple">
        {writings.map((writing) => (
          <AccordionItem key={writing.id} value={writing.id.toString()}>
            <AccordionTrigger>
              <Paragraph clamp={1}>{writing.original}</Paragraph>
            </AccordionTrigger>
            <AccordionContent asChild>
              <FlexColumn gap={3} className="bg-card w-full rounded-lg p-4">
                <Headline size={20}>{t("original")}</Headline>
                <Paragraph lang={writing.language} size={16} height={1.65} mb={4}>
                  {writing.original}
                </Paragraph>
                <Headline size={20}>{t("corrected")}</Headline>
                <Paragraph lang={writing.language} size={16} height={1.65} mb={4}>
                  {writing.corrected}
                </Paragraph>
                <Headline size={20}>{t("feedback")}</Headline>
                <Paragraph
                  lang={writing.feedbackLanguage}
                  size={16}
                  height={1.8}
                  color="muted"
                  className="whitespace-pre-wrap"
                  mb={4}
                >
                  {writing.feedback}
                </Paragraph>
                <Separator className="my-1" />
                <Caption>
                  {formatDistanceToNow(writing.createdAt, {
                    addSuffix: true,
                    locale: getLocaleForFns(locale),
                  })}
                </Caption>
              </FlexColumn>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </FlexColumn>
  );
};
