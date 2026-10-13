import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Fallback view for the unsupported routes. Shows the route that was not found.
 *
 * @summary Page not found view.
 * @author Kiara Tuesta
 */
@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [MatButtonModule, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  /** Path that was requested and could not be resolved. */
  protected readonly invalidPath =
    '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');

  /** Goes back to the Home view. */
  protected navigateToHome(): void {
    this.router.navigate(['/home']).then();
  }
}
