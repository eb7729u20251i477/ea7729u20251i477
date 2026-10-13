import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Resource of a repository item as returned by the GitHub REST API.
 * Property names follow the provider convention (snake_case), not the TypeScript one.
 *
 * @summary GitHub repository resource.
 * @author Kiara Tuesta
 */
export interface TopicRepositoryResource extends BaseResource {
  id: number;
  name: string;
  full_name: string;
  stargazers_count: number;
}

/**
 * Response envelope of the GitHub repository search.
 *
 * @summary GitHub search response.
 * @author Kiara Tuesta
 */
export interface TopicRepositoriesResponse extends BaseResponse {
  total_count: number;
  incomplete_results: boolean;
  items: TopicRepositoryResource[];
}
