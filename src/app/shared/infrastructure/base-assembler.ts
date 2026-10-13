import { BaseEntity } from './base-entity';
import { BaseResource, BaseResponse } from './base-response';

/**
 * Defines the conversions between domain entities and API representations (Assembler pattern).
 *
 * @summary Base assembler contract.
 * @author Kiara Tuesta
 * @typeParam TEntity - Domain entity type.
 * @typeParam TResource - Resource type exchanged with the API.
 * @typeParam TResponse - Response envelope type returned by collection queries.
 */
export interface BaseAssembler<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
> {
  /**
   * Converts a resource into a domain entity.
   * @param resource - The resource to convert.
   */
  toEntityFromResource(resource: TResource): TEntity;

  /**
   * Converts a domain entity into a resource.
   * @param entity - The entity to convert.
   */
  toResourceFromEntity(entity: TEntity): TResource;

  /**
   * Converts a response envelope into a list of domain entities.
   * @param response - The response returned by the API.
   */
  toEntitiesFromResponse(response: TResponse): TEntity[];
}
