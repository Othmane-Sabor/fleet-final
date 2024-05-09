import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { RolePermissionDomainModule } from '../domain'
import { RolePermissionController } from './rolePermission.controller'

import { RoleDomainModule } from '../../../modules/role/domain'

import { RolePermissionByRoleController } from './rolePermissionByRole.controller'

import { PermissionDomainModule } from '../../../modules/permission/domain'

import { RolePermissionByPermissionController } from './rolePermissionByPermission.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    RolePermissionDomainModule,

    RoleDomainModule,

    PermissionDomainModule,
  ],
  controllers: [
    RolePermissionController,

    RolePermissionByRoleController,

    RolePermissionByPermissionController,
  ],
  providers: [],
})
export class RolePermissionApplicationModule {}
