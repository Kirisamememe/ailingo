import { getSession } from "@/lib/auth";
import { getCurrentDate } from "@/lib/utils";
import { InsetLayoutWithPadding } from "@/components/layout";
import { DailyWords } from "./_components/daily-words";
import { dailyService } from "@/services/daily-service";

const Daily = async () => {
  const { operatorId } = await getSession();
  const date = getCurrentDate();
  const newWords = await dailyService.getDailyLearning(operatorId, date);

  return (
    <InsetLayoutWithPadding>
      <DailyWords newWords={newWords?.newWords} />
    </InsetLayoutWithPadding>
  );
};

export default Daily;
