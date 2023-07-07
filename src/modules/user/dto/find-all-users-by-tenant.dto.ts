import { IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllUsersByTenantDto {
  // @IsInt()
  @IsOptional()
  @ApiProperty({ type: Number })
  // @Min(0)
  page: number;

  // @IsInt()
  @IsOptional()
  @ApiProperty({ type: Number })
  // @Min(0)
  limit: number;
}
