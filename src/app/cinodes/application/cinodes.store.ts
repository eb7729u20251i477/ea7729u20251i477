import { computed, inject, Injectable, signal } from '@angular/core';
import { retry } from 'rxjs';
import { CiNode } from '../domain/model/ci-node.entity';
import { RepositoryManifest } from '../domain/model/repository-manifest.entity';
import { CiNodesApi } from '../infrastructure/cinodes-api';

/**
 * Holds the application state of the cinodes bounded context using Angular Signals (Store pattern).
 *
 * @summary CI nodes store.
 * @author Kiara Tuesta
 */
@Injectable({ providedIn: 'root' })
export class CiNodesStore {
  private readonly api = inject(CiNodesApi);

  private readonly ciNodesSignal = signal<CiNode[]>([]);
  private readonly manifestsSignal = signal<RepositoryManifest[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  /** Readonly list of the CI nodes (without repositories). */
  readonly ciNodes = this.ciNodesSignal.asReadonly();

  /** Readonly list of the repository manifests. */
  readonly repositoryManifests = this.manifestsSignal.asReadonly();

  /** Indicates whether a request is in progress. */
  readonly loading = this.loadingSignal.asReadonly();

  /** Last error message, or null. */
  readonly error = this.errorSignal.asReadonly();

  /**
   * CI nodes with their repositories assigned. Totals, available capacity and
   * utilization status are derived by the CiNode entity.
   */
  readonly ciNodeSummaries = computed(() =>
    this.ciNodesSignal().map(
      (node) =>
        new CiNode({
          id: node.id,
          name: node.name,
          location: node.location,
          maxStorageCapacityGb: node.maxStorageCapacityGb,
          repositories: this.manifestsSignal().filter((manifest) => manifest.nodeId === node.id),
        }),
    ),
  );

  /** Loads initial data. */
  constructor() {
    this.loadAll();
  }

  /**
   * Gets the available capacity of a node, reactively computed from the current state.
   * @param nodeId - Node identifier.
   * @returns Available capacity in GB, or 0 if the node does not exist.
   */
  getAvailableCapacityGb(nodeId: number | null): number {
    return this.ciNodeSummaries().find((node) => node.id === nodeId)?.availableCapacityGb ?? 0;
  }

  /**
   * Registers a new repository manifest. registeredAt is populated with the current date/time.
   * @param manifest - Manifest to register (id and registeredAt are overwritten).
   */
  addRepositoryManifest(manifest: RepositoryManifest): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    manifest.registeredAt = new Date().toISOString();
    this.api.createRepositoryManifest(manifest).subscribe({
      next: (created) => {
        this.manifestsSignal.update((manifests) => [...manifests, created]);
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set(this.formatError(error, 'Failed to create repository manifest'));
        this.loadingSignal.set(false);
      },
    });
  }

  private loadAll(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api
      .getCiNodes()
      .pipe(retry(2))
      .subscribe({
        next: (nodes) => {
          this.ciNodesSignal.set(nodes);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to load CI nodes'));
          this.loadingSignal.set(false);
        },
      });
    this.api
      .getRepositoryManifests()
      .pipe(retry(2))
      .subscribe({
        next: (manifests) => this.manifestsSignal.set(manifests),
        error: (error) =>
          this.errorSignal.set(this.formatError(error, 'Failed to load repository manifests')),
      });
  }

  private formatError(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
  }
}
