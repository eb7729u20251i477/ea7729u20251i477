import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { RepositoryManifest } from '../domain/model/repository-manifest.entity';
import {
  RepositoryManifestResource,
  RepositoryManifestsResponse,
} from './repository-manifests-response';

/**
 * Maps repository manifest entities to and from API resources.
 *
 * @summary Repository manifest assembler.
 * @author Kiara Tuesta
 */
export class RepositoryManifestAssembler implements BaseAssembler<
  RepositoryManifest,
  RepositoryManifestResource,
  RepositoryManifestsResponse
> {
  toEntitiesFromResponse(response: RepositoryManifestsResponse): RepositoryManifest[] {
    return response.repositoryManifests.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: RepositoryManifestResource): RepositoryManifest {
    return new RepositoryManifest({
      id: resource.id,
      nodeId: resource.nodeId,
      topic: resource.topic,
      repositoryId: resource.repositoryId,
      repositoryName: resource.repositoryName,
      fullName: resource.fullName,
      stargazersCount: resource.stargazersCount,
      allocatedSizeGb: resource.allocatedSizeGb,
      registeredAt: resource.registeredAt,
    });
  }

  /**
   * Converts the entity to a resource. A new manifest (id 0) is sent without id,
   * so the backend generates it automatically.
   */
  toResourceFromEntity(entity: RepositoryManifest): RepositoryManifestResource {
    return {
      ...(entity.id ? { id: entity.id } : {}),
      nodeId: entity.nodeId,
      topic: entity.topic,
      repositoryId: entity.repositoryId,
      repositoryName: entity.repositoryName,
      fullName: entity.fullName,
      stargazersCount: entity.stargazersCount,
      allocatedSizeGb: entity.allocatedSizeGb,
      registeredAt: entity.registeredAt,
    } as RepositoryManifestResource;
  }
}
