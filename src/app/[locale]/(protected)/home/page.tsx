import { getSession } from "@/lib/auth";
import { getCurrentDate } from "@/lib/utils";
import { InsetLayoutWithPadding } from "@/components/layout";
import { Paragraph } from "@/components/ui/typography";
import { DailyWords } from "./_components/daily-words";
import { dailyService } from "@/services/daily-service";

const Daily = async () => {
  const { operatorId } = await getSession();
  const date = getCurrentDate();
  const dailyLearning = await dailyService.getDailyLearning(operatorId, date);

  if (!dailyLearning?.newEntries.length) {
    return <Paragraph>今日の学習単語はありません。</Paragraph>;
  }

  return (
    <InsetLayoutWithPadding>
      <DailyWords newEntries={dailyLearning.newEntries} />
    </InsetLayoutWithPadding>
  );
};

export default Daily;
