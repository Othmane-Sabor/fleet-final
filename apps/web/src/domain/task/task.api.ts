import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Task } from './task.model'

export class TaskApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Task>,
  ): Promise<Task[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tasks${buildOptions}`)
  }

  static findOne(
    taskId: string,
    queryOptions?: ApiHelper.QueryOptions<Task>,
  ): Promise<Task> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tasks/${taskId}${buildOptions}`)
  }

  static createOne(values: Partial<Task>): Promise<Task> {
    return HttpService.api.post(`/v1/tasks`, values)
  }

  static updateOne(taskId: string, values: Partial<Task>): Promise<Task> {
    return HttpService.api.patch(`/v1/tasks/${taskId}`, values)
  }

  static deleteOne(taskId: string): Promise<void> {
    return HttpService.api.delete(`/v1/tasks/${taskId}`)
  }

  static findManyByAssignedUserId(
    assignedUserId: string,
    queryOptions?: ApiHelper.QueryOptions<Task>,
  ): Promise<Task[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/assignedUser/${assignedUserId}/tasks${buildOptions}`,
    )
  }

  static createOneByAssignedUserId(
    assignedUserId: string,
    values: Partial<Task>,
  ): Promise<Task> {
    return HttpService.api.post(
      `/v1/users/assignedUser/${assignedUserId}/tasks`,
      values,
    )
  }

  static findManyByVehicleId(
    vehicleId: string,
    queryOptions?: ApiHelper.QueryOptions<Task>,
  ): Promise<Task[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/vehicles/vehicle/${vehicleId}/tasks${buildOptions}`,
    )
  }

  static createOneByVehicleId(
    vehicleId: string,
    values: Partial<Task>,
  ): Promise<Task> {
    return HttpService.api.post(
      `/v1/vehicles/vehicle/${vehicleId}/tasks`,
      values,
    )
  }
}
