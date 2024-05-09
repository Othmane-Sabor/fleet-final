import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { MaintenanceDomainFacade } from '@server/modules/maintenance/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { MaintenanceApplicationEvent } from './maintenance.application.event'
import { MaintenanceCreateDto } from './maintenance.dto'

import { VehicleDomainFacade } from '../../vehicle/domain'

@Controller('/v1/vehicles')
export class MaintenanceByVehicleController {
  constructor(
    private vehicleDomainFacade: VehicleDomainFacade,

    private maintenanceDomainFacade: MaintenanceDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/vehicle/:vehicleId/maintenances')
  async findManyVehicleId(
    @Param('vehicleId') vehicleId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.vehicleDomainFacade.findOneByIdOrFail(vehicleId)

    const items = await this.maintenanceDomainFacade.findManyByVehicle(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/vehicle/:vehicleId/maintenances')
  async createByVehicleId(
    @Param('vehicleId') vehicleId: string,
    @Body() body: MaintenanceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, vehicleId }

    const item = await this.maintenanceDomainFacade.create(valuesUpdated)

    await this.eventService.emit<MaintenanceApplicationEvent.MaintenanceCreated.Payload>(
      MaintenanceApplicationEvent.MaintenanceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
