import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class RolePermissionCreateDto {
  @IsString()
  @IsOptional()
  roleId?: string

  @IsString()
  @IsOptional()
  permissionId?: string

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

export class RolePermissionUpdateDto {
  @IsString()
  @IsOptional()
  roleId?: string

  @IsString()
  @IsOptional()
  permissionId?: string

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
