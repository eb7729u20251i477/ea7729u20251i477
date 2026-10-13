import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ngx-translate/core';
import { CiNodesStore } from '../../../application/cinodes.store';
import { CiNodeSummary } from '../../components/ci-node-summary/ci-node-summary';

/**
 * Home view. Shows the welcome text and the "My CI Nodes" section as a grid of CI node summaries.
 *
 * @summary Home view.
 * @author Kiara Tuesta
 */
@Component({
  selector: 'app-home',
  imports: [MatGridListModule, MatProgressSpinnerModule, TranslatePipe, CiNodeSummary],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly store = inject(CiNodesStore);
}
