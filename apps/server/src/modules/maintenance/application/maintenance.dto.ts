import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class MaintenanceCreateDto {
  @IsString()
  @IsNotEmpty()
  scheduleDate: string

  @IsString()
  @IsNotEmpty()
  status: string

  @IsString()
  @IsNotEmpty()
  type: string

  @IsString()
  @IsOptional()
  vehicleId?: string

  @IsString()
  @IsOptional()
  technicianId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class MaintenanceUpdateDto {
  @IsString()
  @IsOptional()
  scheduleDate?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  type?: string

  @IsString()
  @IsOptional()
  vehicleId?: string

  @IsString()
  @IsOptional()
  technicianId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
