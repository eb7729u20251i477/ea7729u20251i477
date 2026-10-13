import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

/**
 * Application shell: toolbar (logo, title, language switcher), sidenav navigation and routed content.
 *
 * @summary Layout component.
 * @author Kiara Tuesta
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe,
    LanguageSwitcher,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  /** URL of the GitHub logo (taken from the environment, not hard-coded). */
  protected readonly logoUrl = environment.githubLogoUrl;

  /** Navigation options of the sidenav. */
  protected readonly options = signal([
    { link: '/home', label: 'layout.option.home', icon: 'home' },
    {
      link: '/repositories/manifests/new',
      label: 'layout.option.new-repository-manifest',
      icon: 'add_box',
    },
  ]);
}
