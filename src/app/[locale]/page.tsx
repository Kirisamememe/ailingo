import { getTranslations } from "next-intl/server";
import { getSession } from "@/lib/auth";

const Home = async () => {
  const t = await getTranslations();
  const { user } = await getSession();

  return (
    <div>
      {t("common.confirm")} {user.name}
    </div>
  );
};

export default Home;
