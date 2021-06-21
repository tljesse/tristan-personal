import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public typewriter_text: string = "Hi, I'm Tristan";
  public typewriter_display: string = "";

  private typedText: string[] = [
    'Hi, I\'m Tristan',
    'I am a ',
  ];
  private retypeText: string[] = [
    'coder',
    'gamer',
    'developer',
    'designer',
    'manager',
    'project manager',
    'surfer',
    'consultant',
    'CEO',
    'entrepreneur',
    '...'
  ];
  public typedDisplay: string[] = [
    '',
    ''
  ];
  public retypeDisplay: string = '';
  currentType: number = 0;
  currentRetype: number = 0;
  retypeForward: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.typingCallback(this);
  }

  typingCallback(that: any) {
    const max = 190,
          min = 80;

    let total_length = that.typedText[that.currentType].length;
    let current_length = that.typedDisplay[that.currentType].length;

    if (current_length < total_length) {
      that.typedDisplay[that.currentType] += that.typedText[that.currentType][current_length];
      setTimeout(that.typingCallback, that.randomRange(max, min), that);
    } else if (that.currentType + 1 < that.typedText.length) {
      that.currentType++;
      setTimeout(that.typingCallback, 500, that);
    } else {
      setTimeout(that.retypeCallback, 100, that);
    }
  }

  retypeCallback(that: any) {
    const max = 140,
          min = 70;

    let total_length = that.retypeText[that.currentRetype].length,
        current_length = that.retypeDisplay.length;

    if (current_length < total_length && that.retypeForward) {
      that.retypeDisplay += that.retypeText[that.currentRetype][current_length];
      setTimeout(that.retypeCallback, that.randomRange(max, min), that);
    } else if (current_length == total_length && that.retypeForward) {
      that.retypeForward = false;
      setTimeout(that.retypeCallback, that.currentRetype == that.retypeText.length - 1 ? 5000 : that.randomRange(500, 1200), that);
    } else if (current_length > 0) {
      that.retypeDisplay = that.retypeDisplay.slice(0, -1);
      setTimeout(that.retypeCallback, 100, that);
    } else {
      that.currentRetype = that.currentRetype + 1 < that.retypeText.length ? that.currentRetype + 1 : 0;
      that.retypeForward = true;
      setTimeout(that.retypeCallback, 200, that);
    }
  }

  randomRange(max: number, min: number) {
    return Math.random() * (max - min) + min;
  }

}
