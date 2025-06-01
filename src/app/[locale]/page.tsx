import { getTranslations } from "next-intl/server";
import { getSession } from "@/lib/auth";

const Home = async () => {
  const t = await getTranslations();
  const { operatorId } = await getSession();

  return (
    <div>
      {t("common.confirm")} {operatorId}
    </div>
  );
};

export default Home;
