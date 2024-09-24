import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {YamlTranslateHttpLoader} from "./services/yaml-translate-http-loader";

export function YamlLoaderFactory(http: HttpClient) {
  return new YamlTranslateHttpLoader(http, './assets/i18n/', '.yml');
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
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideClientHydration(),
      provideAnimationsAsync()
  ]
};
