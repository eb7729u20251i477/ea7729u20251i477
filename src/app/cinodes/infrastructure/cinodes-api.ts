import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { CiNode } from '../domain/model/ci-node.entity';
import { RepositoryManifest } from '../domain/model/repository-manifest.entity';
import { CiNodesApiEndpoint } from './ci-nodes-api-endpoint';
import { RepositoryManifestsApiEndpoint } from './repository-manifests-api-endpoint';

/**
 * Facade over the endpoints of the cinodes bounded context.
 *
 * @summary CI nodes API.
 * @author Kiara Tuesta
 */
@Injectable({ providedIn: 'root' })
export class CiNodesApi extends BaseApi {
  private readonly ciNodesEndpoint: CiNodesApiEndpoint;
  private readonly repositoryManifestsEndpoint: RepositoryManifestsApiEndpoint;

  constructor() {
    super();
    const http = inject(HttpClient);
    this.ciNodesEndpoint = new CiNodesApiEndpoint(http);
    this.repositoryManifestsEndpoint = new RepositoryManifestsApiEndpoint(http);
  }

  /** Retrieves all the CI nodes. */
  getCiNodes(): Observable<CiNode[]> {
    return this.ciNodesEndpoint.getAll();
  }

  /** Retrieves all the repository manifests. */
  getRepositoryManifests(): Observable<RepositoryManifest[]> {
    return this.repositoryManifestsEndpoint.getAll();
  }

  /**
   * Creates a repository manifest.
   * @param manifest - Manifest to create.
   */
  createRepositoryManifest(manifest: RepositoryManifest): Observable<RepositoryManifest> {
    return this.repositoryManifestsEndpoint.create(manifest);
  }
}
