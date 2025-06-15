/**
 * フォームの状態
 */
export type FormState = {
  /**
   * 成功かどうか
   */
  isSuccess: boolean;
  /**
   * エラー
   */
  error?: {
    message: string;
  };
};
