import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a repository manifest.
 *
 * @summary Repository manifest resource.
 * @author Kiara Tuesta
 */
export interface RepositoryManifestResource extends BaseResource {
  id: number;
  nodeId: number;
  topic: string;
  repositoryId: number;
  repositoryName: string;
  fullName: string;
  stargazersCount: number;
  allocatedSizeGb: number;
  registeredAt: string;
}

/**
 * Response envelope for repository manifest collection queries.
 *
 * @summary Repository manifests response.
 * @author Kiara Tuesta
 */
export interface RepositoryManifestsResponse extends BaseResponse {
  repositoryManifests: RepositoryManifestResource[];
}
