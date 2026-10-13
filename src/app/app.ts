import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Layout } from './shared/presentation/components/layout/layout';

/**
 * Root component. Bootstraps localization (English by default) and hosts the layout shell.
 *
 * @summary Application root component.
 * @author Kiara Tuesta
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Layout],
  template: '<app-layout />',
})
export class App {
  private readonly translate = inject(TranslateService);

  /**
   * Registers the supported languages and sets English as the default one.
   */
  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.use('en');
  }
}
