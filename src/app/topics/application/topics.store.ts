import { inject, Injectable, signal } from '@angular/core';
import { TopicRepository } from '../domain/model/topic-repository.entity';
import { TopicsApi } from '../infrastructure/topics-api';

/**
 * Holds the repositories available for assignment, fetched in real time by topic (Store pattern).
 *
 * @summary Topics store.
 * @author Kiara Tuesta
 */
@Injectable({ providedIn: 'root' })
export class TopicsStore {
  private readonly api = inject(TopicsApi);

  private readonly repositoriesSignal = signal<TopicRepository[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  /** Readonly list of repositories of the selected topic. */
  readonly repositories = this.repositoriesSignal.asReadonly();

  /** Indicates whether the GitHub request is in progress. */
  readonly loading = this.loadingSignal.asReadonly();

  /** Last error message, or null. */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Loads the repositories of a topic from the GitHub API.
   * @param topic - Selected topic.
   */
  loadRepositoriesByTopic(topic: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.repositoriesSignal.set([]);
    this.api.getRepositoriesByTopic(topic).subscribe({
      next: (repositories) => {
        this.repositoriesSignal.set(repositories);
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set(
          error instanceof Error ? error.message : 'Failed to load repositories',
        );
        this.loadingSignal.set(false);
      },
    });
  }

  /**
   * Finds a loaded repository by id.
   * @param repositoryId - GitHub repository id.
   */
  findRepositoryById(repositoryId: number | null): TopicRepository | undefined {
    return this.repositoriesSignal().find((repository) => repository.id === repositoryId);
  }
}
