/**
 * User
 */
export type User = {
  /**
   * ユーザーID
   */
  id: number;
  /**
   * ユーザー名
   */
  name: string;
  /**
   * ユーザーのメールアドレス
   */
  email: string;
  /**
   * ユーザーの画像
   */
  image?: string;
  /**
   * ユーザーの権限
   */
  role: Role;
};

/**
 * Role
 */
export type Role = "ADMIN" | "USER" | "VIEWER" | "BLOCKED";
