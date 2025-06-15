import { formatDistanceToNow } from "date-fns";
import { useLocale } from "next-intl";
import { getLocaleForFns } from "@/lib/utils";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Separator } from "@/components/ui/separator";
import { Caption } from "@/components/ui/typography";

type Props = {
  createdAt: Date;
  updatedAt: Date;
  lastReviewedAt: Date;
  nextReviewAt: Date | null;
  masteredAt: Date | null;
};

/**
 * ワードブックコンテンツフッター
 */
export const WordbookContentFooter: React.FC<Props> = ({
  createdAt,
  updatedAt,
  lastReviewedAt,
  nextReviewAt,
  masteredAt,
}) => {
  const locale = useLocale();

  return (
    <>
      <Separator />
      <FlexRow gap={8}>
        <FlexColumn gap={1}>
          <Caption size={12} weight={700}>
            {"Created At"}
          </Caption>
          <Caption color="foreground">
            {formatDistanceToNow(createdAt, {
              addSuffix: true,
              locale: getLocaleForFns(locale),
            })}
          </Caption>
        </FlexColumn>
        <FlexColumn gap={1}>
          <Caption size={12} weight={700}>
            {"Updated At"}
          </Caption>
          <Caption color="foreground">
            {formatDistanceToNow(updatedAt, {
              addSuffix: true,
              locale: getLocaleForFns(locale),
            })}
          </Caption>
        </FlexColumn>
        {!masteredAt && (
          <FlexColumn gap={1}>
            <Caption size={12} weight={700}>
              {"Last Reviewed At"}
            </Caption>
            <Caption color="foreground">
              {formatDistanceToNow(lastReviewedAt, {
                addSuffix: true,
                locale: getLocaleForFns(locale),
              })}
            </Caption>
          </FlexColumn>
        )}
        {nextReviewAt && !masteredAt && (
          <FlexColumn gap={1}>
            <Caption size={12} weight={700}>
              {"Next Review At"}
            </Caption>
            <Caption color="foreground">
              {formatDistanceToNow(nextReviewAt, {
                addSuffix: true,
                locale: getLocaleForFns(locale),
              })}
            </Caption>
          </FlexColumn>
        )}
        {masteredAt && (
          <FlexColumn gap={1}>
            <Caption size={12} weight={700}>
              {"Mastered At"}
            </Caption>
            <Caption color="foreground">
              {formatDistanceToNow(masteredAt, {
                addSuffix: true,
                locale: getLocaleForFns(locale),
              })}
            </Caption>
          </FlexColumn>
        )}
      </FlexRow>
    </>
  );
};
