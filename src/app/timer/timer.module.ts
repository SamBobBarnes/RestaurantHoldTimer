import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerGridComponent } from './timer-grid/timer-grid.component';
import { TimerButtonComponent } from './timer-button/timer-button.component';

@NgModule({
  declarations: [TimerGridComponent, TimerButtonComponent],
  imports: [CommonModule],
  exports: [TimerGridComponent],
})
export class TimerModule {}
