import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Vehicle } from './vehicle.model'

export class VehicleApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Vehicle>,
  ): Promise<Vehicle[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/vehicles${buildOptions}`)
  }

  static findOne(
    vehicleId: string,
    queryOptions?: ApiHelper.QueryOptions<Vehicle>,
  ): Promise<Vehicle> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/vehicles/${vehicleId}${buildOptions}`)
  }

  static createOne(values: Partial<Vehicle>): Promise<Vehicle> {
    return HttpService.api.post(`/v1/vehicles`, values)
  }

  static updateOne(
    vehicleId: string,
    values: Partial<Vehicle>,
  ): Promise<Vehicle> {
    return HttpService.api.patch(`/v1/vehicles/${vehicleId}`, values)
  }

  static deleteOne(vehicleId: string): Promise<void> {
    return HttpService.api.delete(`/v1/vehicles/${vehicleId}`)
  }

  static findManyByVehicleTypeId(
    vehicleTypeId: string,
    queryOptions?: ApiHelper.QueryOptions<Vehicle>,
  ): Promise<Vehicle[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/vehicleTypes/vehicleType/${vehicleTypeId}/vehicles${buildOptions}`,
    )
  }

  static createOneByVehicleTypeId(
    vehicleTypeId: string,
    values: Partial<Vehicle>,
  ): Promise<Vehicle> {
    return HttpService.api.post(
      `/v1/vehicleTypes/vehicleType/${vehicleTypeId}/vehicles`,
      values,
    )
  }

  static findManyByDepartmentId(
    departmentId: string,
    queryOptions?: ApiHelper.QueryOptions<Vehicle>,
  ): Promise<Vehicle[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/departments/department/${departmentId}/vehicles${buildOptions}`,
    )
  }

  static createOneByDepartmentId(
    departmentId: string,
    values: Partial<Vehicle>,
  ): Promise<Vehicle> {
    return HttpService.api.post(
      `/v1/departments/department/${departmentId}/vehicles`,
      values,
    )
  }
}
