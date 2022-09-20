import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose, Transform, Type } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

// @ArgsType()
export class PaginationArgs {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  // @Field(() => Int, { nullable: true, defaultValue: 100 })
  limit?: number = 100

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  // @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset?: number = 0
}

/**
 * Shared sort direction enum for sorting arg in GraphQL
 */
export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
// registerEnumType(SortDirection, { name: 'SortDirection' })
