import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateService } from '@ngx-translate/core';

/**
 * Select buttons ("EN" / "ES") that switch the language of the user interface.
 *
 * @summary Language switcher component.
 * @author Kiara Tuesta
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule],
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcher {
  private readonly translate = inject(TranslateService);

  /** Currently selected language code (English by default). */
  protected currentLang = 'en';

  /** Available language codes. */
  protected readonly languages = ['en', 'es'];

  /**
   * Changes the active language.
   * @param language - Language code ("en" or "es").
   */
  protected useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLang = language;
  }
}
