import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { CiNode } from '../domain/model/ci-node.entity';
import { CiNodeResource, CiNodesResponse } from './ci-nodes-response';

/**
 * Maps CI node entities to and from API resources.
 *
 * @summary CI node assembler.
 * @author Kiara Tuesta
 */
export class CiNodeAssembler implements BaseAssembler<CiNode, CiNodeResource, CiNodesResponse> {
  toEntitiesFromResponse(response: CiNodesResponse): CiNode[] {
    return response.ciNodes.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: CiNodeResource): CiNode {
    return new CiNode({
      id: resource.id,
      name: resource.name,
      location: resource.location,
      maxStorageCapacityGb: resource.maxStorageCapacityGb,
    });
  }

  toResourceFromEntity(entity: CiNode): CiNodeResource {
    return {
      id: entity.id,
      name: entity.name,
      location: entity.location,
      maxStorageCapacityGb: entity.maxStorageCapacityGb,
    };
  }
}
