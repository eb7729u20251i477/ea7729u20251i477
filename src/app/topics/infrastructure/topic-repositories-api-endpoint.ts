import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { TopicRepository } from '../domain/model/topic-repository.entity';
import { TopicRepositoryAssembler } from './topic-repository-assembler';
import { TopicRepositoriesResponse, TopicRepositoryResource } from './topic-repositories-response';

/**
 * Endpoint client for the GitHub repository search.
 *
 * @summary Topic repositories API endpoint.
 * @author Kiara Tuesta
 */
export class TopicRepositoriesApiEndpoint extends BaseApiEndpoint<
  TopicRepository,
  TopicRepositoryResource,
  TopicRepositoriesResponse,
  TopicRepositoryAssembler
> {
  /**
   * @param http - HTTP client used to call the GitHub REST API.
   */
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.githubApiBaseUrl}${environment.githubSearchRepositoriesEndpointPath}`,
      new TopicRepositoryAssembler(),
    );
  }

  /**
   * Searches the repositories that belong to a topic.
   * @param topic - Topic to search (e.g. "angular").
   */
  getByTopic(topic: string): Observable<TopicRepository[]> {
    return this.http
      .get<TopicRepositoriesResponse>(`${this.endpointUrl}?q=topic:${topic}`)
      .pipe(map((response) => this.assembler.toEntitiesFromResponse(response)));
  }
}
