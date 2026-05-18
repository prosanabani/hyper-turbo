import type { CustomDecorator} from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

import type { ROLE } from '../constants/role.constant';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLE[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles);
