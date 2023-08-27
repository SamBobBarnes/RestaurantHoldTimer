import { TimerButtonComponent } from './timer-button.component';
import { renderRootComponent } from '../../common-components/RenderRootComponent';
import { fireEvent, screen } from '@testing-library/angular';

describe('TimerButtonComponent', () => {
  let options: TimerOptions;
  beforeEach(() => {
    options = {
      text: '',
      time: 0,
      timerComplete: false,
      timerRunning: false,
      displayChoice: false,
    };
  });

  describe('text display', () => {
    it('should show text', async () => {
      options.text = 'test text';
      await render(options);
      expect(screen.getByText('test text')).toBeTruthy();
    });

    it('should show text substring when timer is running and text is longer than 8 characters', async () => {
      options.text = '123456789';
      await render(options);
      const timer = screen.getByTitle('timer-click');
      fireEvent.click(timer);
      expect(screen.getByText('123456...')).toBeTruthy();
    });

    it('should show full text when timer is running and text is not longer than 8 characters', async () => {
      options.text = '12345678';
      await render(options);
      const timer = screen.getByTitle('timer-click');
      fireEvent.click(timer);
      expect(screen.getByText('12345678')).toBeTruthy();
    });
  });

  describe('time display', () => {
    it('should show correctly formatted if time is less than ten', async () => {
      options.time = 9;
      await render(options);
      const timer = screen.getByTitle('timer-click');
      fireEvent.click(timer);
      expect(screen.getByText('0:09')).toBeTruthy();
    });

    it('should show correctly formatted if time is more than ten and less than 60', async () => {
      options.time = 59;
      await render(options);
      const timer = screen.getByTitle('timer-click');
      fireEvent.click(timer);
      expect(screen.getByText('0:59')).toBeTruthy();
    });

    it('should show correctly formatted if time is more than 59', async () => {
      options.time = 69;
      await render(options);
      const timer = screen.getByTitle('timer-click');
      fireEvent.click(timer);
      expect(screen.getByText('1:09')).toBeTruthy();
    });
  });

  it('should show timer-click div by default', async () => {
    await render(options);
    expect(screen.getByTitle('timer-click')).toBeTruthy();
  });

  it('should show not show timer-click when display choice is true', async () => {
    options.displayChoice = true;
    await render(options);
    expect(screen.queryByTitle('timer-click')).toBeFalsy();
  });

  it('should start timer when timer-click is clicked', async () => {
    options.time = 69;
    await render(options);
    const timer = screen.getByTitle('timer-click');
    fireEvent.click(timer);
    expect(screen.getByTitle('progress-bar')).toBeTruthy();
  });

  it('should show end-bar after timer is complete', async () => {
    await render(options);
    const timer = screen.getByTitle('timer-click');
    fireEvent.click(timer);
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByTitle('end-bar')).toBeTruthy();
  });

  it('should hide end-bar after dismissing', async () => {
    await render(options);
    const timer = screen.getByTitle('timer-click');
    fireEvent.click(timer);
    await new Promise((r) => setTimeout(r, 2000));
    fireEvent.click(timer);
    expect(screen.queryByTitle('end-bar')).toBeFalsy();
  });

  describe('choice', () => {
    it('should not show choice when timer is running', async () => {
      options.time = 69;
      await render(options);
      const timer = screen.getByTitle('timer-click');
      fireEvent.click(timer);
      expect(screen.queryByTitle('choice')).toBeFalsy();
    });

    it('should show choice when timer is clicked after starting', async () => {
      options.time = 69;
      await render(options);
      const timer = screen.getByTitle('timer-click');
      fireEvent.click(timer);
      fireEvent.click(timer);
      expect(screen.getByTitle('choice')).toBeTruthy();
    });

    it('should hide choice when cancel is selected without stopping timer', async () => {
      options.time = 69;
      await render(options);
      const timer = screen.getByTitle('timer-click');
      fireEvent.click(timer);
      fireEvent.click(timer);
      const cancel = screen.getByTitle('x');
      fireEvent.click(cancel);
      expect(screen.queryByTitle('choice')).toBeFalsy();
      expect(screen.getByTitle('progress-bar')).toBeTruthy();
    });

    it('should cancel timer when confirm is selected', async () => {
      options.time = 69;
      await render(options);
      const timer = screen.getByTitle('timer-click');
      fireEvent.click(timer);
      fireEvent.click(timer);
      const confirm = screen.getByTitle('confirm');
      fireEvent.click(confirm);
      expect(screen.queryByTitle('choice')).toBeFalsy();
      expect(screen.queryByTitle('progress-bar')).toBeFalsy();
    });
  });

  describe('initial assignments', () => {
    it('should set defaultTime', async () => {
      options.time = 69;
      const { fixture } = await render(options);
      expect(fixture.componentInstance.defaultTime).toBe(69);
    });

    it('should set textDisplay', async () => {
      options.text = 'test text';
      const { fixture } = await render(options);
      expect(fixture.componentInstance.textDisplay).toBe('test text');
    });
  });
});

interface TimerOptions {
  text: string;
  time: number;
  timerRunning: boolean;
  timerComplete: boolean;
  displayChoice: boolean;
}

async function render(options: TimerOptions) {
  return await renderRootComponent(TimerButtonComponent, {
    componentProperties: options,
  });
}
