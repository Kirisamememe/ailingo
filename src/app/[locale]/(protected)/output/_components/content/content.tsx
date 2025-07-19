import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * 作文修正メインコンポーネント
 */
export const WritingCorrectionContent = () => {
  return (
    <Card className="w-full rounded-lg">
      <CardHeader>
        <CardTitle>作文添削</CardTitle>
        <CardDescription>作文を添削する</CardDescription>
      </CardHeader>
      <CardContent>Contents</CardContent>
    </Card>
  );
};
