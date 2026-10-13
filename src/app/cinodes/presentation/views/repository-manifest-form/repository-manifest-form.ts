import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TopicsStore } from '../../../../topics/application/topics.store';
import { Topic, TOPICS } from '../../../../topics/domain/model/topic';
import { CiNodesStore } from '../../../application/cinodes.store';
import { RepositoryManifest } from '../../../domain/model/repository-manifest.entity';

/**
 * Reactive form to register an open source repository in a regional CI/CD node.
 * The form is only valid when the allocated size is greater than 0 and lower than or equal to the
 * available capacity of the selected node.
 *
 * @summary New repository manifest view.
 * @author Kiara Tuesta
 */
@Component({
  selector: 'app-repository-manifest-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TranslatePipe,
  ],
  templateUrl: './repository-manifest-form.html',
  styleUrl: './repository-manifest-form.css',
})
export class RepositoryManifestForm {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  protected readonly ciNodesStore = inject(CiNodesStore);
  protected readonly topicsStore = inject(TopicsStore);

  /** Supported topics shown in the topic select. */
  protected readonly topics = TOPICS;

  /** Reactive form. */
  protected readonly form = this.fb.group({
    topic: this.fb.control<Topic | null>(null, Validators.required),
    repositoryId: this.fb.control<number | null>(null, Validators.required),
    nodeId: this.fb.control<number | null>(null, Validators.required),
    allocatedSizeGb: this.fb.control<number | null>(null, Validators.required),
  });

  /** Identifier of the node selected at this moment. */
  protected selectedNodeId: number | null = null;

  /** Allocated size typed by the user. */
  protected allocatedSize: number | null = null;

  /** Reacts to the changes of the topic, the node and the allocated size. */
  constructor() {
    this.form.controls.topic.valueChanges.subscribe((topic) => {
      this.form.controls.repositoryId.reset(null);
      if (topic) this.topicsStore.loadRepositoriesByTopic(topic);
    });
    this.form.controls.nodeId.valueChanges.subscribe((nodeId) => (this.selectedNodeId = nodeId));
    this.form.controls.allocatedSizeGb.valueChanges.subscribe(
      (size) => (this.allocatedSize = size),
    );
  }

  /** Available capacity (GB) of the node selected at this moment, or null if there is none. */
  protected get availableCapacityGb(): number | null {
    return this.selectedNodeId === null
      ? null
      : this.ciNodesStore.getAvailableCapacityGb(this.selectedNodeId);
  }

  /** True when the allocated size is not greater than 0. */
  protected isSizeNotPositive(): boolean {
    return this.allocatedSize !== null && Number(this.allocatedSize) <= 0;
  }

  /** True when the allocated size exceeds the available capacity of the selected node (cross validation). */
  protected isSizeExceedingCapacity(): boolean {
    const available = this.availableCapacityGb;
    return (
      this.allocatedSize !== null && available !== null && Number(this.allocatedSize) > available
    );
  }

  /** The form can be submitted only if it is valid and the allocated size is within the capacity. */
  protected canCreate(): boolean {
    return this.form.valid && !this.isSizeNotPositive() && !this.isSizeExceedingCapacity();
  }

  /** Creates the manifest (registeredAt and id are generated) and goes back to /home. */
  protected create(): void {
    if (!this.canCreate()) return;
    const value = this.form.getRawValue();
    const repository = this.topicsStore.findRepositoryById(value.repositoryId);
    if (!repository) return;
    this.ciNodesStore.addRepositoryManifest(
      new RepositoryManifest({
        id: 0,
        nodeId: value.nodeId!,
        topic: value.topic!,
        repositoryId: repository.id,
        repositoryName: repository.name,
        fullName: repository.fullName,
        stargazersCount: repository.stargazersCount,
        allocatedSizeGb: Number(value.allocatedSizeGb),
        registeredAt: '',
      }),
    );
    this.router.navigate(['/home']).then();
  }

  /** Discards the form and goes back to /home. */
  protected cancel(): void {
    this.router.navigate(['/home']).then();
  }
}
