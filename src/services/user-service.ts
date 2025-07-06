import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";

/**
 * UserService
 */
class UserService {
  /**
   * ユーザーを取得する
   */
  async getUser(id: string) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length ? result[0] : undefined;
  }

  /**
   * ユーザーをメールアドレスで取得する
   */
  async getUserByEmail(email: string) {
    // eslint-disable-next-line no-console
    console.log("getUserByEmail", email);
    const result = await db.select().from(users).where(eq(users.email, email));
    return result.length ? result[0] : undefined;
  }
}

const userService = new UserService();
export { userService };
