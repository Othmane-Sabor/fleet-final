import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { RolePermission } from './rolePermission.model'

import { Role } from '../../role/domain'

import { Permission } from '../../permission/domain'

@Injectable()
export class RolePermissionDomainFacade {
  constructor(
    @InjectRepository(RolePermission)
    private repository: Repository<RolePermission>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<RolePermission>): Promise<RolePermission> {
    return this.repository.save(values)
  }

  async update(
    item: RolePermission,
    values: Partial<RolePermission>,
  ): Promise<RolePermission> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: RolePermission): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<RolePermission> = {},
  ): Promise<RolePermission[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<RolePermission> = {},
  ): Promise<RolePermission> {
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

  async findManyByRole(
    item: Role,
    queryOptions: RequestHelper.QueryOptions<RolePermission> = {},
  ): Promise<RolePermission[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('role')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        roleId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByPermission(
    item: Permission,
    queryOptions: RequestHelper.QueryOptions<RolePermission> = {},
  ): Promise<RolePermission[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('permission')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        permissionId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
