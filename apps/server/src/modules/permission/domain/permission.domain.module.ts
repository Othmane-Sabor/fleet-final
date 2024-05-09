import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PermissionDomainFacade } from './permission.domain.facade'
import { Permission } from './permission.model'

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), DatabaseHelperModule],
  providers: [PermissionDomainFacade, PermissionDomainFacade],
  exports: [PermissionDomainFacade],
})
export class PermissionDomainModule {}
