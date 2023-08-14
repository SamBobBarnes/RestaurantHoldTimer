import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer-button',
  templateUrl: './timer-button.component.html',
  styleUrls: ['./timer-button.component.css'],
})
export class TimerButtonComponent implements OnInit {
  @Input() text: string;
  @Input() time: number;
  timeDisplay: string = '';
  textDisplay: string = '';

  ngOnInit() {
    this.textDisplay = this.text;
    this.checkTextLength();
  }

  checkTextLength() {
    if (this.text.length > 8 && this.timeDisplay !== '') {
      this.textDisplay = this.text.substring(0, 6) + '...';
    } else {
      this.textDisplay = this.text;
    }
  }
}
