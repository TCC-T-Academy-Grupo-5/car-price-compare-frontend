import {HeaderComponent} from "@ui/header/header.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatMenuModule} from "@angular/material/menu";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {ThemeService} from "@services/theme.service";
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;

  const mockActivatedRoute = {
    snapshot: { data: {} }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        TranslateModule.forRoot(),
        MatMenuModule,
        HttpClientTestingModule,
        FontAwesomeTestingModule,
      ],
      providers: [
        ThemeService,
        TranslateService,
        { provide: DOCUMENT, useValue: document },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang('en');
    translateService.use('en');
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language', () => {
    const newLang = 'en';
    component.switchLang(newLang);
    expect(translateService.currentLang).toBe(newLang);
  });

  it('should toggle theme', () => {
    const initialTheme = component.getThemeServiceCurrentTheme();
    component.toggleTheme();
    const toggledTheme = initialTheme === 'dark' ? 'light' : 'dark';
    expect(component.getThemeServiceCurrentTheme()).toBe(toggledTheme);
  });

  it('should handle logout', () => {
    spyOn(console, 'log');
    component.logout();
    expect(console.log).toHaveBeenCalledWith('Logout efetuado com sucesso.');
  });
});
