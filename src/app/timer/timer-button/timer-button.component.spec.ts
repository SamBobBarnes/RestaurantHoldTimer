import { TimerButtonComponent } from './timer-button.component';
import { renderRootComponent } from '../../common-components/RenderRootComponent';
import { screen } from '@testing-library/angular';

describe('TimerButtonComponent', () => {
  beforeEach(() => {});

  it('should show text', async () => {
    await render('test text', 60, '');
    expect(screen.getByText('test text')).toBeTruthy();
  });
});

async function render(text: string, time: number, timeDisplay: string) {
  return await renderRootComponent(TimerButtonComponent, {
    componentProperties: {
      text,
      time,
      timeDisplay,
    },
  });
}
