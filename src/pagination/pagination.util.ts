import { IConnection } from './pagination.type'

/**
 * Create paginated response from array
 */
export function createPaginatedResponse<T>(
  array: T[],
  count: number,
  limit: number = 100,
  offset: number = 0,
  min?: number,
  max?: number,
): IConnection<T> {
  return {
    totalCount: count,
    totalPage: Math.ceil(count / limit),
    hasNextPage: offset + limit < count,
    nodes: array,
    min,
    max,
  }
}
