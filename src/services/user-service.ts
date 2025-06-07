import "server-only";
import prisma from "@/prisma";

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
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
}

const userService = new UserService();
export { userService };
