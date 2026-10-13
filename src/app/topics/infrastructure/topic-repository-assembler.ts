import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { TopicRepository } from '../domain/model/topic-repository.entity';
import { TopicRepositoriesResponse, TopicRepositoryResource } from './topic-repositories-response';

/**
 * Maps the GitHub resources (snake_case) to domain entities (camelCase) and back.
 *
 * @summary Topic repository assembler.
 * @author Kiara Tuesta
 */
export class TopicRepositoryAssembler implements BaseAssembler<
  TopicRepository,
  TopicRepositoryResource,
  TopicRepositoriesResponse
> {
  toEntitiesFromResponse(response: TopicRepositoriesResponse): TopicRepository[] {
    return response.items.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: TopicRepositoryResource): TopicRepository {
    return new TopicRepository({
      id: resource.id,
      name: resource.name,
      fullName: resource.full_name,
      stargazersCount: resource.stargazers_count,
    });
  }

  toResourceFromEntity(entity: TopicRepository): TopicRepositoryResource {
    return {
      id: entity.id,
      name: entity.name,
      full_name: entity.fullName,
      stargazers_count: entity.stargazersCount,
    } as TopicRepositoryResource;
  }
}
