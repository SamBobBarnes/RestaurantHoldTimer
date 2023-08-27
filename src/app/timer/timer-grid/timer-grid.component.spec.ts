import { TimerGridComponent } from './timer-grid.component';
import { renderRootComponent } from '../../common-components/RenderRootComponent';

describe('TimerGridComponent', () => {
  beforeEach(() => {});

  it('should create', async () => {
    const component = await renderRootComponent(TimerGridComponent);
    expect(component).toBeTruthy();
  });
});
