import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerGridComponent } from './timer-grid/timer-grid.component';
import { TimerButtonComponent } from './timer-button/timer-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [TimerGridComponent, TimerButtonComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [TimerGridComponent],
})
export class TimerModule {}
