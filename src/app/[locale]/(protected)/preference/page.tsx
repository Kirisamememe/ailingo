import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PasskeyRegistration } from "./_components/passkey-registration";

const Preference = () => {
  return (
    <div className="w-full max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Manage login methods for this account.</CardDescription>
        </CardHeader>
        <CardContent>
          <PasskeyRegistration />
        </CardContent>
      </Card>
    </div>
  );
};

export default Preference;
