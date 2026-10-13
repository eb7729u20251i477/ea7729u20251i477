import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a CI node.
 *
 * @summary CI node resource.
 * @author Kiara Tuesta
 */
export interface CiNodeResource extends BaseResource {
  id: number;
  name: string;
  location: string;
  maxStorageCapacityGb: number;
}

/**
 * Response envelope for CI node collection queries.
 *
 * @summary CI nodes response.
 * @author Kiara Tuesta
 */
export interface CiNodesResponse extends BaseResponse {
  ciNodes: CiNodeResource[];
}
