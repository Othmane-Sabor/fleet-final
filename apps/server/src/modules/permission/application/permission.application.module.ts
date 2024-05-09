import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PermissionDomainModule } from '../domain'
import { PermissionController } from './permission.controller'

@Module({
  imports: [AuthenticationDomainModule, PermissionDomainModule],
  controllers: [PermissionController],
  providers: [],
})
export class PermissionApplicationModule {}
