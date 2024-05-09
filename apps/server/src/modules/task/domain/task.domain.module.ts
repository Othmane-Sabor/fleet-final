import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TaskDomainFacade } from './task.domain.facade'
import { Task } from './task.model'

@Module({
  imports: [TypeOrmModule.forFeature([Task]), DatabaseHelperModule],
  providers: [TaskDomainFacade, TaskDomainFacade],
  exports: [TaskDomainFacade],
})
export class TaskDomainModule {}
