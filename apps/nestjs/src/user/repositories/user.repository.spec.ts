import { NotFoundException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { ROLE } from '../../auth/constants/role.constant';
import { PrismaService } from '../../shared/prisma/prisma.service';
import type { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repository: UserRepository;

  let prismaService: {
    user: {
      findUnique: jest.Mock;
    };
  };

  beforeEach(async () => {
    prismaService = {
      user: {
        findUnique: jest.fn(),
      },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    repository = moduleRef.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('Get user by id', () => {
    const currentDate = new Date();
    it('should call findUnique with correct id', async () => {
      const id = 1;

      const expectedOutput: User = {
        id,
        name: 'Default User',
        username: 'default-user',
        password: 'random-password',
        roles: [ROLE.USER],
        isAccountDisabled: false,
        email: 'default-user@random.com',
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(expectedOutput);
      await repository.getById(id);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return user if found', async () => {
      const expectedOutput: User = {
        id: 1,
        name: 'Default User',
        username: 'default-user',
        password: 'random-password',
        roles: [ROLE.USER],
        isAccountDisabled: false,
        email: 'default-user@random.com',
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(expectedOutput);

      expect(await repository.getById(1)).toEqual(expectedOutput);
    });

    it('should throw NotFoundError when user not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      try {
        await repository.getById(1);
      } catch (error: any) {
        expect(error.constructor).toBe(NotFoundException);
      }
    });
  });
});
