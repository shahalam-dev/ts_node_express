import { User } from "../interfaces";
import prisma from "../prisma";

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  static async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  static async createUser(data: { name: string; email: string }): Promise<User> {
    return prisma.user.create({ data });
  }
}