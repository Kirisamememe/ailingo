import "server-only";
import { prisma } from "@/lib/db";

/**
 * UserService
 */
class UserService {
  /**
   * ユーザーを取得する
   */
  async getUser(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  /**
   * ユーザーをメールアドレスで取得する
   */
  async getUserByEmail(email: string) {
    // eslint-disable-next-line no-console
    console.log("getUserByEmail", email);
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
}

const userService = new UserService();
export { userService };
