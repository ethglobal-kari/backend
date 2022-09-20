import { Type, Abstract } from '@nestjs/common'
// import { Field, Int, ObjectType } from '@nestjs/graphql'

export interface IConnection<T> {
  totalCount: number
  totalPage: number
  hasNextPage: boolean
  nodes: T[]
  min: number
  max: number
}

type IType<T> = Type<T> | Abstract<T>

/**
 * Dynamically create and return pagination type
 */
export function Paginated<T>(type: IType<T>): any {
  // @ObjectType({ isAbstract: true })
  abstract class Connection implements IConnection<T> {
    // @Field(() => Int)
    totalCount: number

    // @Field(() => Int)
    totalPage: number

    // @Field()
    hasNextPage: boolean

    // @Field(() => [type])
    nodes: T[]

    // @Field()
    min: number

    // @Field()
    max: number
  }

  return Connection
}
