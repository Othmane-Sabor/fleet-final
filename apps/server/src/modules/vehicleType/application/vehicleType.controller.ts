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
import {
  VehicleType,
  VehicleTypeDomainFacade,
} from '@server/modules/vehicleType/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { VehicleTypeApplicationEvent } from './vehicleType.application.event'
import { VehicleTypeCreateDto, VehicleTypeUpdateDto } from './vehicleType.dto'

@Controller('/v1/vehicleTypes')
export class VehicleTypeController {
  constructor(
    private eventService: EventService,
    private vehicleTypeDomainFacade: VehicleTypeDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.vehicleTypeDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: VehicleTypeCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.vehicleTypeDomainFacade.create(body)

    await this.eventService.emit<VehicleTypeApplicationEvent.VehicleTypeCreated.Payload>(
      VehicleTypeApplicationEvent.VehicleTypeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:vehicleTypeId')
  async findOne(
    @Param('vehicleTypeId') vehicleTypeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.vehicleTypeDomainFacade.findOneByIdOrFail(
      vehicleTypeId,
      queryOptions,
    )

    return item
  }

  @Patch('/:vehicleTypeId')
  async update(
    @Param('vehicleTypeId') vehicleTypeId: string,
    @Body() body: VehicleTypeUpdateDto,
  ) {
    const item =
      await this.vehicleTypeDomainFacade.findOneByIdOrFail(vehicleTypeId)

    const itemUpdated = await this.vehicleTypeDomainFacade.update(
      item,
      body as Partial<VehicleType>,
    )
    return itemUpdated
  }

  @Delete('/:vehicleTypeId')
  async delete(@Param('vehicleTypeId') vehicleTypeId: string) {
    const item =
      await this.vehicleTypeDomainFacade.findOneByIdOrFail(vehicleTypeId)

    await this.vehicleTypeDomainFacade.delete(item)

    return item
  }
}
