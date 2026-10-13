import { BaseEntity } from '../../../shared/infrastructure/base-entity';

/**
 * Registration of an open source repository in a regional CI/CD node.
 *
 * @summary Repository manifest entity.
 * @author Kiara Tuesta
 */
export class RepositoryManifest implements BaseEntity {
  id: number;
  nodeId: number;
  topic: string;
  repositoryId: number;
  repositoryName: string;
  fullName: string;
  stargazersCount: number;
  allocatedSizeGb: number;
  registeredAt: string;

  /**
   * @param props - Initialization values of the manifest.
   */
  constructor(props: {
    id: number;
    nodeId: number;
    topic: string;
    repositoryId: number;
    repositoryName: string;
    fullName: string;
    stargazersCount: number;
    allocatedSizeGb: number;
    registeredAt: string;
  }) {
    this.id = props.id;
    this.nodeId = props.nodeId;
    this.topic = props.topic;
    this.repositoryId = props.repositoryId;
    this.repositoryName = props.repositoryName;
    this.fullName = props.fullName;
    this.stargazersCount = props.stargazersCount;
    this.allocatedSizeGb = props.allocatedSizeGb;
    this.registeredAt = props.registeredAt;
  }
}
