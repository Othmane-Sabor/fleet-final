import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Vehicle } from './vehicle.model'

import { VehicleType } from '../../vehicleType/domain'

import { Department } from '../../department/domain'

@Injectable()
export class VehicleDomainFacade {
  constructor(
    @InjectRepository(Vehicle)
    private repository: Repository<Vehicle>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Vehicle>): Promise<Vehicle> {
    return this.repository.save(values)
  }

  async update(item: Vehicle, values: Partial<Vehicle>): Promise<Vehicle> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Vehicle): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Vehicle> = {},
  ): Promise<Vehicle[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Vehicle> = {},
  ): Promise<Vehicle> {
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

  async findManyByVehicleType(
    item: VehicleType,
    queryOptions: RequestHelper.QueryOptions<Vehicle> = {},
  ): Promise<Vehicle[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('vehicleType')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        vehicleTypeId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByDepartment(
    item: Department,
    queryOptions: RequestHelper.QueryOptions<Vehicle> = {},
  ): Promise<Vehicle[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('department')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        departmentId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
