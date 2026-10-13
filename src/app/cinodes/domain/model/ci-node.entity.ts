import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { RepositoryManifest } from './repository-manifest.entity';
import { UtilizationStatus } from './utilization-status';

/**
 * Regional CI/CD processing node. Encapsulates the storage business rules.
 *
 * @summary CI node entity.
 * @author Kiara Tuesta
 */
export class CiNode implements BaseEntity {
  id: number;
  name: string;
  location: string;
  maxStorageCapacityGb: number;

  /** Repository manifests hosted in this node. */
  repositories: RepositoryManifest[];

  /**
   * @param props - Initialization values of the node.
   */
  constructor(props: {
    id: number;
    name: string;
    location: string;
    maxStorageCapacityGb: number;
    repositories?: RepositoryManifest[];
  }) {
    this.id = props.id;
    this.name = props.name;
    this.location = props.location;
    this.maxStorageCapacityGb = props.maxStorageCapacityGb;
    this.repositories = props.repositories ?? [];
  }

  /** Sum of the allocatedSizeGb of all the repositories hosted in the node. */
  get totalAllocatedStorageGb(): number {
    return this.repositories.reduce((total, repository) => total + repository.allocatedSizeGb, 0);
  }

  /** Remaining capacity: maxStorageCapacityGb minus the total allocated storage. */
  get availableCapacityGb(): number {
    return this.maxStorageCapacityGb - this.totalAllocatedStorageGb;
  }

  /** Used capacity as a percentage: (total allocated / max capacity) * 100. */
  get utilizationPercentage(): number {
    return this.maxStorageCapacityGb > 0
      ? (this.totalAllocatedStorageGb / this.maxStorageCapacityGb) * 100
      : 0;
  }

  /** Normal (< 75%), Warning (75% - 99%) or Critical (100%). */
  get utilizationStatus(): UtilizationStatus {
    const percentage = this.utilizationPercentage;
    if (percentage >= 100) return 'critical';
    if (percentage >= 75) return 'warning';
    return 'normal';
  }
}
