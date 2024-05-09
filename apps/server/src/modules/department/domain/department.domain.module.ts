import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DepartmentDomainFacade } from './department.domain.facade'
import { Department } from './department.model'

@Module({
  imports: [TypeOrmModule.forFeature([Department]), DatabaseHelperModule],
  providers: [DepartmentDomainFacade, DepartmentDomainFacade],
  exports: [DepartmentDomainFacade],
})
export class DepartmentDomainModule {}
