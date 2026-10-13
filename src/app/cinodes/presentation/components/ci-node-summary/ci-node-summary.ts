import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { CiNode } from '../../../domain/model/ci-node.entity';

/**
 * Card that summarizes a CI node: its repositories and its storage indicators.
 *
 * @summary CI node summary component.
 * @author Kiara Tuesta
 */
@Component({
  selector: 'app-ci-node-summary',
  standalone: true,
  imports: [
    DecimalPipe,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    TranslatePipe,
  ],
  templateUrl: './ci-node-summary.html',
  styleUrl: './ci-node-summary.css',
})
export class CiNodeSummary {
  /** CI node (with its repositories) to summarize. */
  @Input() ciNode!: CiNode;

  /** Used percentage capped to 100 for the progress bar. */
  get progressValue(): number {
    return Math.min(100, this.ciNode.utilizationPercentage);
  }

  /** Icon that complements the color of the status (not only color conveys meaning). */
  get statusIcon(): string {
    switch (this.ciNode.utilizationStatus) {
      case 'critical':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'check_circle';
    }
  }
}
