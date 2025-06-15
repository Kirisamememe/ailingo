import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useFormField } from "./form";

type Props = React.ComponentProps<"p"> & {
  i18nNameSpace: string;
};

export const FormMsg: React.FC<Props> = ({ i18nNameSpace, className, ...props }) => {
  const { error, formMessageId } = useFormField();
  // @ts-expect-error: 動的なnamespaceのため型チェックを無効化
  const t = useTranslations(i18nNameSpace);

  // エラーがある場合、error.messageをi18nキーとして翻訳
  // next-intlは存在しないキーに対してエラーを投げず、フォールバック文字列を返す
  const body = error
    ? (() => {
        const message = error.message;
        if (!message) return String(error.message);
        // 型制約を回避（next-intlは実行時エラーを投げない）
        return (t as (key: string) => string)(message);
      })()
    : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
};
