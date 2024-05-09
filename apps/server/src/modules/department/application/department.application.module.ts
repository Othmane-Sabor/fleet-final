import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DepartmentDomainModule } from '../domain'
import { DepartmentController } from './department.controller'

@Module({
  imports: [AuthenticationDomainModule, DepartmentDomainModule],
  controllers: [DepartmentController],
  providers: [],
})
export class DepartmentApplicationModule {}
