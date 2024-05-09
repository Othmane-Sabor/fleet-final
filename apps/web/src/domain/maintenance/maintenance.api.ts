import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Maintenance } from './maintenance.model'

export class MaintenanceApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Maintenance>,
  ): Promise<Maintenance[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/maintenances${buildOptions}`)
  }

  static findOne(
    maintenanceId: string,
    queryOptions?: ApiHelper.QueryOptions<Maintenance>,
  ): Promise<Maintenance> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/maintenances/${maintenanceId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Maintenance>): Promise<Maintenance> {
    return HttpService.api.post(`/v1/maintenances`, values)
  }

  static updateOne(
    maintenanceId: string,
    values: Partial<Maintenance>,
  ): Promise<Maintenance> {
    return HttpService.api.patch(`/v1/maintenances/${maintenanceId}`, values)
  }

  static deleteOne(maintenanceId: string): Promise<void> {
    return HttpService.api.delete(`/v1/maintenances/${maintenanceId}`)
  }

  static findManyByVehicleId(
    vehicleId: string,
    queryOptions?: ApiHelper.QueryOptions<Maintenance>,
  ): Promise<Maintenance[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/vehicles/vehicle/${vehicleId}/maintenances${buildOptions}`,
    )
  }

  static createOneByVehicleId(
    vehicleId: string,
    values: Partial<Maintenance>,
  ): Promise<Maintenance> {
    return HttpService.api.post(
      `/v1/vehicles/vehicle/${vehicleId}/maintenances`,
      values,
    )
  }

  static findManyByTechnicianId(
    technicianId: string,
    queryOptions?: ApiHelper.QueryOptions<Maintenance>,
  ): Promise<Maintenance[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/technician/${technicianId}/maintenances${buildOptions}`,
    )
  }

  static createOneByTechnicianId(
    technicianId: string,
    values: Partial<Maintenance>,
  ): Promise<Maintenance> {
    return HttpService.api.post(
      `/v1/users/technician/${technicianId}/maintenances`,
      values,
    )
  }
}
