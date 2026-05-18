import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../shared/prisma/prisma.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return user as unknown as User;
  }

  async findOne(args: any): Promise<User | null> {
    const user = await this.prisma.user.findFirst(args);
    return user ? (user as unknown as User) : null;
  }

  async findAndCount(args: any): Promise<[User[], number]> {
    const [users, count] = await Promise.all([
      this.prisma.user.findMany(args),
      this.prisma.user.count({ where: args?.where }),
    ]);
    return [users as unknown as User[], count];
  }

  async save(user: Partial<User>): Promise<User> {
    if (user.id) {
      const { id, ...data } = user;
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: data as any,
      });
      return updatedUser as unknown as User;
    } else {
      const createdUser = await this.prisma.user.create({
        data: user as any,
      });
      return createdUser as unknown as User;
    }
  }
}
