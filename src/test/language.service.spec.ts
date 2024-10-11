import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@services/language.service';

class MockTranslateService {
  private currentLang!: string;

  use(lang: string) {
    this.currentLang = lang;
  }

  instant(key: string) {
    return key;
  }

  getCurrentLang() {
    return this.currentLang || 'pt';
  }
}

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslateService, useClass: MockTranslateService }
      ]
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
