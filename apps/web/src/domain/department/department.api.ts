import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Department } from './department.model'

export class DepartmentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Department>,
  ): Promise<Department[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/departments${buildOptions}`)
  }

  static findOne(
    departmentId: string,
    queryOptions?: ApiHelper.QueryOptions<Department>,
  ): Promise<Department> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/departments/${departmentId}${buildOptions}`)
  }

  static createOne(values: Partial<Department>): Promise<Department> {
    return HttpService.api.post(`/v1/departments`, values)
  }

  static updateOne(
    departmentId: string,
    values: Partial<Department>,
  ): Promise<Department> {
    return HttpService.api.patch(`/v1/departments/${departmentId}`, values)
  }

  static deleteOne(departmentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/departments/${departmentId}`)
  }
}
