import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { VehicleType } from './vehicleType.model'

@Injectable()
export class VehicleTypeDomainFacade {
  constructor(
    @InjectRepository(VehicleType)
    private repository: Repository<VehicleType>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<VehicleType>): Promise<VehicleType> {
    return this.repository.save(values)
  }

  async update(
    item: VehicleType,
    values: Partial<VehicleType>,
  ): Promise<VehicleType> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: VehicleType): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<VehicleType> = {},
  ): Promise<VehicleType[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<VehicleType> = {},
  ): Promise<VehicleType> {
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
}
