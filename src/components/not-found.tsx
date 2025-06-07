import { NotFoundIllustration } from "@/components/404";
import { Button } from "@/components/ui/button";
import { Flexbox } from "@/components/ui/flexbox";
import { Headline } from "@/components/ui/typography";
import { Link } from "@/i18n";

type Props = {
  href?: string;
};

/**
 * NotFound
 */
export const NotFound = ({ href = "/" }: Props) => {
  return (
    <Flexbox center className="m-auto">
      <NotFoundIllustration />
      <Headline size={20}>Not Found</Headline>
      <p>Could not find requested resource</p>
      <Button asChild className="mt-4 mb-12">
        <Link href={href}>Back to home</Link>
      </Button>
    </Flexbox>
  );
};
