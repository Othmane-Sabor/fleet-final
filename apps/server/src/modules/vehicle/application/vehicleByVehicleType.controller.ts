import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { VehicleDomainFacade } from '@server/modules/vehicle/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { VehicleApplicationEvent } from './vehicle.application.event'
import { VehicleCreateDto } from './vehicle.dto'

import { VehicleTypeDomainFacade } from '../../vehicleType/domain'

@Controller('/v1/vehicleTypes')
export class VehicleByVehicleTypeController {
  constructor(
    private vehicleTypeDomainFacade: VehicleTypeDomainFacade,

    private vehicleDomainFacade: VehicleDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/vehicleType/:vehicleTypeId/vehicles')
  async findManyVehicleTypeId(
    @Param('vehicleTypeId') vehicleTypeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.vehicleTypeDomainFacade.findOneByIdOrFail(vehicleTypeId)

    const items = await this.vehicleDomainFacade.findManyByVehicleType(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/vehicleType/:vehicleTypeId/vehicles')
  async createByVehicleTypeId(
    @Param('vehicleTypeId') vehicleTypeId: string,
    @Body() body: VehicleCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, vehicleTypeId }

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
