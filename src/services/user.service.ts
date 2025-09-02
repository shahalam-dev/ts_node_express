import { User } from "../interfaces";
import prisma from "../lib/prisma";

export class UserService {
  static async getUsersPaginated(
    skip: number,
    take: number,
  ): Promise<{
    users: User[];
    total: number;
  }> {
    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({ skip, take }),
      prisma.user.count(),
    ]);
    return { users, total };
  }

  static async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  static async createUser(data: { name: string; email: string }): Promise<User> {
    return prisma.user.create({ data });
  }
}
