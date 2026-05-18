import type { INestApplication } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { execSync } from 'child_process';
import * as path from 'path';
import { Client } from 'pg';
import request from 'supertest';

import { ROLE } from '../src/auth/constants/role.constant';
import type { LoginInput } from '../src/auth/dtos/auth-login-input.dto';
import type { AuthTokenOutput } from '../src/auth/dtos/auth-token-output.dto';
import { RequestContext } from '../src/shared/request-context/request-context.dto';
import type { CreateUserInput } from '../src/user/dtos/user-create-input.dto';
import type { UserOutput } from '../src/user/dtos/user-output.dto';
import { UserService } from '../src/user/services/user.service';

const TEST_DB_HOST = process.env.TEST_DB_HOST ?? 'localhost';
const TEST_DB_PORT = parseInt(process.env.DB_PORT ?? '5432', 10);
const TEST_DB_USER = process.env.DB_USER ?? 'root';
const TEST_DB_PASS = process.env.DB_PASS ?? 'example';

export const TEST_DB_NAME = 'e2e_test_db';

export const resetDBBeforeTest = async (): Promise<void> => {
  const adminClient = new Client({
    host: TEST_DB_HOST,
    port: TEST_DB_PORT,
    user: TEST_DB_USER,
    password: TEST_DB_PASS,
    database: 'postgres',
  });

  await adminClient.connect();

  await adminClient.query(
    `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid()`,
    [TEST_DB_NAME],
  );

  await adminClient.query(`DROP DATABASE IF EXISTS "${TEST_DB_NAME}"`);
  await adminClient.query(`CREATE DATABASE "${TEST_DB_NAME}"`);
  await adminClient.end();

  process.env.DB_NAME = TEST_DB_NAME;
  process.env.DATABASE_URL =
    process.env.TEST_DATABASE_URL ??
    `postgresql://${TEST_DB_USER}:${TEST_DB_PASS}@${TEST_DB_HOST}:${TEST_DB_PORT}/${TEST_DB_NAME}?schema=public`;

  const projectRoot = path.resolve(__dirname, '..');
  execSync('npx prisma migrate deploy', {
    cwd: projectRoot,
    env: process.env,
    stdio: 'inherit',
  });
};

/** Legacy hook; migrations run in {@link resetDBBeforeTest}. */
export const createDBEntities = async (): Promise<void> => {};

export const seedAdminUser = async (
  app: INestApplication,
): Promise<{ adminUser: UserOutput; authTokenForAdmin: AuthTokenOutput }> => {
  const defaultAdmin: CreateUserInput = {
    name: 'Default Admin User',
    username: 'default-admin',
    password: 'default-admin-password',
    roles: [ROLE.ADMIN],
    isAccountDisabled: false,
    email: 'default-admin@example.com',
  };

  const ctx = new RequestContext();

  const userService = app.get(UserService);
  const userOutput = await userService.createUser(ctx, defaultAdmin);

  const loginInput: LoginInput = {
    username: defaultAdmin.username,
    password: defaultAdmin.password,
  };

  const loginResponse = await request(app.getHttpServer())
    .post('/auth/login')
    .send(loginInput)
    .expect(HttpStatus.OK);

  const authTokenForAdmin: AuthTokenOutput = loginResponse.body.data;

  const adminUser: UserOutput = JSON.parse(JSON.stringify(userOutput));

  return { adminUser, authTokenForAdmin };
};

export const closeDBAfterTest = async (): Promise<void> => {};
