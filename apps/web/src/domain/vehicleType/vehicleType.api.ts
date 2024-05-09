import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { VehicleType } from './vehicleType.model'

export class VehicleTypeApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<VehicleType>,
  ): Promise<VehicleType[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/vehicleTypes${buildOptions}`)
  }

  static findOne(
    vehicleTypeId: string,
    queryOptions?: ApiHelper.QueryOptions<VehicleType>,
  ): Promise<VehicleType> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/vehicleTypes/${vehicleTypeId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<VehicleType>): Promise<VehicleType> {
    return HttpService.api.post(`/v1/vehicleTypes`, values)
  }

  static updateOne(
    vehicleTypeId: string,
    values: Partial<VehicleType>,
  ): Promise<VehicleType> {
    return HttpService.api.patch(`/v1/vehicleTypes/${vehicleTypeId}`, values)
  }

  static deleteOne(vehicleTypeId: string): Promise<void> {
    return HttpService.api.delete(`/v1/vehicleTypes/${vehicleTypeId}`)
  }
}
