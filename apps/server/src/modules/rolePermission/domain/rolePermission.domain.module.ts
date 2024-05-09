import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { RolePermissionDomainFacade } from './rolePermission.domain.facade'
import { RolePermission } from './rolePermission.model'

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission]), DatabaseHelperModule],
  providers: [RolePermissionDomainFacade, RolePermissionDomainFacade],
  exports: [RolePermissionDomainFacade],
})
export class RolePermissionDomainModule {}
