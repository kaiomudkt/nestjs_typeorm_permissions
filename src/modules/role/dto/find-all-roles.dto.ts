import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllRolesByTenantDto {
  @IsOptional()
  @ApiProperty({ type: Number })
  // @Min(0)
  page: number;

  @IsOptional()
  @ApiProperty({ type: Number })
  // @Min(0)
  limit: number;
}
