import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Vehicle, VehicleDomainFacade } from '@server/modules/vehicle/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { VehicleApplicationEvent } from './vehicle.application.event'
import { VehicleCreateDto, VehicleUpdateDto } from './vehicle.dto'

@Controller('/v1/vehicles')
export class VehicleController {
  constructor(
    private eventService: EventService,
    private vehicleDomainFacade: VehicleDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.vehicleDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: VehicleCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.vehicleDomainFacade.create(body)

    await this.eventService.emit<VehicleApplicationEvent.VehicleCreated.Payload>(
      VehicleApplicationEvent.VehicleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:vehicleId')
  async findOne(
    @Param('vehicleId') vehicleId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.vehicleDomainFacade.findOneByIdOrFail(
      vehicleId,
      queryOptions,
    )

    return item
  }

  @Patch('/:vehicleId')
  async update(
    @Param('vehicleId') vehicleId: string,
    @Body() body: VehicleUpdateDto,
  ) {
    const item = await this.vehicleDomainFacade.findOneByIdOrFail(vehicleId)

    const itemUpdated = await this.vehicleDomainFacade.update(
      item,
      body as Partial<Vehicle>,
    )
    return itemUpdated
  }

  @Delete('/:vehicleId')
  async delete(@Param('vehicleId') vehicleId: string) {
    const item = await this.vehicleDomainFacade.findOneByIdOrFail(vehicleId)

    await this.vehicleDomainFacade.delete(item)

    return item
  }
}
