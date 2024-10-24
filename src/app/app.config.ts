import {ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {BrowserModule} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {YamlTranslateHttpLoader} from "@services/yaml-translate-http-loader";
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import {requestInterceptor} from './core/interceptors/request.interceptor';

function YamlLoaderFactory(http: HttpClient) {
  return new YamlTranslateHttpLoader(http, './assets/translations/', '.yml');
}

registerLocaleData(localePt, 'pt-BR', localePtExtra)

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: YamlLoaderFactory,
          deps: [HttpClient]
        }
      }),
    ),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([requestInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
};
