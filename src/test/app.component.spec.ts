import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '@ui/header/header.component';
import { FooterComponent } from '@ui/footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {ThemeService} from "@services/theme.service";

describe('AppComponent', () => {
  let mockThemeService: jasmine.SpyObj<ThemeService>;
  let mockFaIconLibrary: jasmine.SpyObj<FaIconLibrary>;

  beforeEach(async () => {
    mockThemeService = jasmine.createSpyObj('ThemeService', ['toggleTheme']);
    mockFaIconLibrary = jasmine.createSpyObj('FaIconLibrary', ['addIconPacks', 'addIcons']);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        NoopAnimationsModule,
        HeaderComponent,
        FooterComponent
      ],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: FaIconLibrary, useValue: mockFaIconLibrary }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Car Price Compare' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Car Price Compare');
  });

  it('should render title in header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const headerElement: HTMLElement = fixture.nativeElement.querySelector('tcc-header');
    expect(headerElement.textContent).toContain('Car Price Compare');
  });

  it('should toggle theme', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.toggleTheme();
    expect(mockThemeService.toggleTheme).toHaveBeenCalled();
  });

  it('should toggle dropdown', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.toggleDropdown();
    expect(app.isDropdownOpen).toBeTrue();
    app.toggleDropdown();
    expect(app.isDropdownOpen).toBeFalse();
  });

  it('should initialize font awesome icons', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(mockFaIconLibrary.addIconPacks).toHaveBeenCalled();
    expect(mockFaIconLibrary.addIcons).toHaveBeenCalled();
  });
});
