import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { VehicleDomainFacade } from '@server/modules/vehicle/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { VehicleApplicationEvent } from './vehicle.application.event'
import { VehicleCreateDto } from './vehicle.dto'

import { DepartmentDomainFacade } from '../../department/domain'

@Controller('/v1/departments')
export class VehicleByDepartmentController {
  constructor(
    private departmentDomainFacade: DepartmentDomainFacade,

    private vehicleDomainFacade: VehicleDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/department/:departmentId/vehicles')
  async findManyDepartmentId(
    @Param('departmentId') departmentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.departmentDomainFacade.findOneByIdOrFail(departmentId)

    const items = await this.vehicleDomainFacade.findManyByDepartment(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/department/:departmentId/vehicles')
  async createByDepartmentId(
    @Param('departmentId') departmentId: string,
    @Body() body: VehicleCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, departmentId }

    const item = await this.vehicleDomainFacade.create(valuesUpdated)

    await this.eventService.emit<VehicleApplicationEvent.VehicleCreated.Payload>(
      VehicleApplicationEvent.VehicleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
