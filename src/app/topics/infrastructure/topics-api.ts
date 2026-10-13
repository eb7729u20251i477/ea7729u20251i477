import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { TopicRepository } from '../domain/model/topic-repository.entity';
import { TopicRepositoriesApiEndpoint } from './topic-repositories-api-endpoint';

/**
 * Facade over the external API provider (GitHub) used by the topics bounded context.
 *
 * @summary Topics API.
 * @author Kiara Tuesta
 */
@Injectable({ providedIn: 'root' })
export class TopicsApi extends BaseApi {
  private readonly topicRepositoriesEndpoint: TopicRepositoriesApiEndpoint;

  constructor() {
    super();
    this.topicRepositoriesEndpoint = new TopicRepositoriesApiEndpoint(inject(HttpClient));
  }

  /**
   * Retrieves the repositories of a topic.
   * @param topic - Topic to search.
   */
  getRepositoriesByTopic(topic: string): Observable<TopicRepository[]> {
    return this.topicRepositoriesEndpoint.getByTopic(topic);
  }
}
