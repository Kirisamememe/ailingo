import { BaseLayout } from "@/components/layout";
import { NotFound } from "@/components/not-found";

/**
 * NotFoundPage
 */
const NotFoundPage = () => {
  return (
    <BaseLayout locale={"en"}>
      <NotFound href="/home" />
    </BaseLayout>
  );
};

export default NotFoundPage;
