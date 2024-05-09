import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class VehicleCreateDto {
  @IsString()
  @IsNotEmpty()
  licensePlate: string

  @IsString()
  @IsNotEmpty()
  model: string

  @IsNumber()
  @IsNotEmpty()
  year: number

  @IsString()
  @IsOptional()
  vehicleTypeId?: string

  @IsString()
  @IsOptional()
  departmentId?: string

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

export class VehicleUpdateDto {
  @IsString()
  @IsOptional()
  licensePlate?: string

  @IsString()
  @IsOptional()
  model?: string

  @IsNumber()
  @IsOptional()
  year?: number

  @IsString()
  @IsOptional()
  vehicleTypeId?: string

  @IsString()
  @IsOptional()
  departmentId?: string

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
