import { InsetLayoutWithPadding } from "@/components/layout";

type Props = {
  params: Promise<{ id: string }>;
};

const Profile = async ({ params }: Props) => {
  const { id } = await params;

  return <InsetLayoutWithPadding>profile {id}</InsetLayoutWithPadding>;
};

export default Profile;
