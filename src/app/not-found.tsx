import { BaseLayout } from "@/components/layout";
import { NotFound } from "@/components/not-found";

/**
 * NotFoundPage
 */
const NotFoundPage = () => {
  return (
    <BaseLayout locale={"en"}>
      <NotFound href="/daily" />
    </BaseLayout>
  );
};

export default NotFoundPage;
