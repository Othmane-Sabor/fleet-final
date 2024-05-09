import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AlertDomainFacade } from '@server/modules/alert/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AlertApplicationEvent } from './alert.application.event'
import { AlertCreateDto } from './alert.dto'

import { VehicleDomainFacade } from '../../vehicle/domain'

@Controller('/v1/vehicles')
export class AlertByVehicleController {
  constructor(
    private vehicleDomainFacade: VehicleDomainFacade,

    private alertDomainFacade: AlertDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/vehicle/:vehicleId/alerts')
  async findManyVehicleId(
    @Param('vehicleId') vehicleId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.vehicleDomainFacade.findOneByIdOrFail(vehicleId)

    const items = await this.alertDomainFacade.findManyByVehicle(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/vehicle/:vehicleId/alerts')
  async createByVehicleId(
    @Param('vehicleId') vehicleId: string,
    @Body() body: AlertCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, vehicleId }

    const item = await this.alertDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AlertApplicationEvent.AlertCreated.Payload>(
      AlertApplicationEvent.AlertCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
