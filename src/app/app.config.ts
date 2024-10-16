import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {BrowserModule} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {YamlTranslateHttpLoader} from "@services/yaml-translate-http-loader";

function YamlLoaderFactory(http: HttpClient) {
  return new YamlTranslateHttpLoader(http, './assets/translations/', '.yml');
}

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
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
