import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { RolePermission } from './rolePermission.model'

export class RolePermissionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<RolePermission>,
  ): Promise<RolePermission[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/rolePermissions${buildOptions}`)
  }

  static findOne(
    rolePermissionId: string,
    queryOptions?: ApiHelper.QueryOptions<RolePermission>,
  ): Promise<RolePermission> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/rolePermissions/${rolePermissionId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<RolePermission>): Promise<RolePermission> {
    return HttpService.api.post(`/v1/rolePermissions`, values)
  }

  static updateOne(
    rolePermissionId: string,
    values: Partial<RolePermission>,
  ): Promise<RolePermission> {
    return HttpService.api.patch(
      `/v1/rolePermissions/${rolePermissionId}`,
      values,
    )
  }

  static deleteOne(rolePermissionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/rolePermissions/${rolePermissionId}`)
  }

  static findManyByRoleId(
    roleId: string,
    queryOptions?: ApiHelper.QueryOptions<RolePermission>,
  ): Promise<RolePermission[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/roles/role/${roleId}/rolePermissions${buildOptions}`,
    )
  }

  static createOneByRoleId(
    roleId: string,
    values: Partial<RolePermission>,
  ): Promise<RolePermission> {
    return HttpService.api.post(
      `/v1/roles/role/${roleId}/rolePermissions`,
      values,
    )
  }

  static findManyByPermissionId(
    permissionId: string,
    queryOptions?: ApiHelper.QueryOptions<RolePermission>,
  ): Promise<RolePermission[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/permissions/permission/${permissionId}/rolePermissions${buildOptions}`,
    )
  }

  static createOneByPermissionId(
    permissionId: string,
    values: Partial<RolePermission>,
  ): Promise<RolePermission> {
    return HttpService.api.post(
      `/v1/permissions/permission/${permissionId}/rolePermissions`,
      values,
    )
  }
}
