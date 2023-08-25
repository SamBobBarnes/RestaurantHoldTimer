import { Component, Input, OnInit } from '@angular/core';
// import { faCheck, faX } from '@fortawesome/free-solid-svg-icon';

@Component({
  selector: 'app-timer-button',
  templateUrl: './timer-button.component.html',
  styleUrls: ['./timer-button.component.css'],
})
export class TimerButtonComponent implements OnInit {
  @Input() text: string;
  @Input() time: number = 0;
  defaultTime: number;
  timeDisplay: string = '';
  textDisplay: string = '';
  timerRunning: boolean = false;
  interval: string | number | NodeJS.Timeout;
  timerComplete: boolean = false;
  // faCheck = faCheck;
  // fax = faX;

  ngOnInit() {
    this.textDisplay = this.text;
    this.checkTextLength();
    this.defaultTime = this.time + 0;
  }

  checkTextLength() {
    if (this.text.length > 8 && this.timeDisplay !== '') {
      this.textDisplay = this.text.substring(0, 6) + '...';
    } else {
      this.textDisplay = this.text;
    }
  }

  progressBarStyle(): string {
    let width = 8;
    let ratio = this.time / this.defaultTime;
    return `width:${width * ratio}rem`;
  }

  timer() {
    if (this.timerComplete) {
      this.timerComplete = false;
    } else if (this.timerRunning) {
      this.endTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.timerRunning = true;
    this.timeDisplay = this.transform(this.time);
    this.checkTextLength();
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time = this.defaultTime;
        this.timerComplete = true;
        this.endTimer();
      } else {
        this.time--;
        this.timeDisplay = this.transform(this.time);
      }
    }, 1000);
  }
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      minutes +
      ':' +
      (value - minutes * 60 < 10
        ? '0' + (value - minutes * 60)
        : value - minutes * 60)
    );
  }
  endTimer() {
    this.timerRunning = false;
    clearInterval(this.interval);
    this.timeDisplay = '';
    this.checkTextLength();
  }
}
