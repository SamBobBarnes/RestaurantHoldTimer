import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { screen } from '@testing-library/angular';
import { renderRootComponent } from './common-components/RenderRootComponent';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Restaurant Hold Timer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Restaurant Hold Timer');
  });

  it('should render title', async () => {
    await renderRootComponent(AppComponent);
    expect(screen.getByText('Restaurant Hold Timer')).toBeTruthy();
  });
});
