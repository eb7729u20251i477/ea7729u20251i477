import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { RepositoryManifest } from '../domain/model/repository-manifest.entity';
import { RepositoryManifestAssembler } from './repository-manifest-assembler';
import {
  RepositoryManifestResource,
  RepositoryManifestsResponse,
} from './repository-manifests-response';

/**
 * Endpoint client for the repository-manifests resource.
 *
 * @summary Repository manifests API endpoint.
 * @author Kiara Tuesta
 */
export class RepositoryManifestsApiEndpoint extends BaseApiEndpoint<
  RepositoryManifest,
  RepositoryManifestResource,
  RepositoryManifestsResponse,
  RepositoryManifestAssembler
> {
  /**
   * @param http - HTTP client used to call the fake API.
   */
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderRepositoryManifestsEndpointPath}`,
      new RepositoryManifestAssembler(),
    );
  }
}
