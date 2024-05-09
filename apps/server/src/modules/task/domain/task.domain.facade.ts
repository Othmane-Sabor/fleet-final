import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Task } from './task.model'

import { User } from '../../user/domain'

import { Vehicle } from '../../vehicle/domain'

@Injectable()
export class TaskDomainFacade {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Task>): Promise<Task> {
    return this.repository.save(values)
  }

  async update(item: Task, values: Partial<Task>): Promise<Task> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Task): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Task> = {},
  ): Promise<Task[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Task> = {},
  ): Promise<Task> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByAssignedUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Task> = {},
  ): Promise<Task[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('assignedUser')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        assignedUserId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByVehicle(
    item: Vehicle,
    queryOptions: RequestHelper.QueryOptions<Task> = {},
  ): Promise<Task[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('vehicle')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        vehicleId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
