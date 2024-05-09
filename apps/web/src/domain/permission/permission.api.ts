import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Permission } from './permission.model'

export class PermissionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Permission>,
  ): Promise<Permission[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/permissions${buildOptions}`)
  }

  static findOne(
    permissionId: string,
    queryOptions?: ApiHelper.QueryOptions<Permission>,
  ): Promise<Permission> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/permissions/${permissionId}${buildOptions}`)
  }

  static createOne(values: Partial<Permission>): Promise<Permission> {
    return HttpService.api.post(`/v1/permissions`, values)
  }

  static updateOne(
    permissionId: string,
    values: Partial<Permission>,
  ): Promise<Permission> {
    return HttpService.api.patch(`/v1/permissions/${permissionId}`, values)
  }

  static deleteOne(permissionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/permissions/${permissionId}`)
  }
}
