import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { CiNode } from '../domain/model/ci-node.entity';
import { CiNodeAssembler } from './ci-node-assembler';
import { CiNodeResource, CiNodesResponse } from './ci-nodes-response';

/**
 * Endpoint client for the ci-nodes resource.
 *
 * @summary CI nodes API endpoint.
 * @author Kiara Tuesta
 */
export class CiNodesApiEndpoint extends BaseApiEndpoint<
  CiNode,
  CiNodeResource,
  CiNodesResponse,
  CiNodeAssembler
> {
  /**
   * @param http - HTTP client used to call the fake API.
   */
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderCiNodesEndpointPath}`,
      new CiNodeAssembler(),
    );
  }
}
