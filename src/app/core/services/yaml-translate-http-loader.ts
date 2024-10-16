import {Inject, Injectable, InjectionToken} from "@angular/core";
import {TranslateLoader} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {parse} from "yaml";

export const PREFIX = new InjectionToken<string>('prefix');
export const SUFFIX = new InjectionToken<string>('suffix');

@Injectable({
  providedIn: 'root'
})
export class YamlTranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    @Inject(PREFIX) private prefix: string,
    @Inject(SUFFIX) private suffix: string
  ) {}

  public getTranslation(lang: string): Observable<Record<string, string> | undefined> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`, { responseType: 'text' }).pipe(
      map((response: string) => parse(response))
    );
  }
}
