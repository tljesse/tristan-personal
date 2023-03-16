---
title: 'Decordle, Late to the Party'
description: A deep dive into the word guessing game variant
published: false
blurb: 'I made a thing, but it is probably too late.'
datePublished: '2023-02-16'
slug: 'decordle-late-to-the-party'
authorImage: ['../../../../assets/img/tristan.png']
author: ["Tristan Jesse"]
---

Time is a predator that's stalking us, or so says the villian in Star Trek: Generations. While that may be a bit extreme we are nevertheless impacted by time...all the time! The Wordle craze came about quite some time ago and it took over pop culture like mad. It is a very simple game but still addicting but the thing that really gave it legs was the ability of sharing your accomplishments and easily relating. Each player around the world had the same set of words each day and the mechanism for showing how you did was simple. This led to friends vying for the best round each day for months as the urge to do better than your peers didn't seem to fade.

After some time variants of the game started to emerge, the most popular amoung my friends was (Quordle)[https://www.quordle.com/] where you had four simultanous boards. Eventually we got to joking about how many boards there could be, and me being the programmer of the group volunteered to make the 10 board version. After beginning, time sunk it's teeth into me and I left the work finishing it on the shelf for quite awhile. Fast forward to now and it is a curiosity of the past, another footnote in the history of lockdowns. With that thought I finially finished my version just in time for no one to care about it.

## What Did I Build

I give you (Decordle)[https://decordle.io]! The rules are much as you expect except the default version is 10 different games at once. You'll also see there is a 20, 50 and 100 game modes. How would you go about making this? Of course you can copy and paste enough code to get this result, but that is repitive and hard to maintain or make changes. Why not use the power of Angular, components and structural directives to simplify your code and make the compiler work for you.

We're going to get into the code in this article and talk about iterating with `ngFor`, component `@Input` and `@Output`, data binding, and we'll even touch on scheduling tasks with Firebase Functions. All these parts work together to make the game function and allows us the flexibility to make a Wordle variant with as many boards as we like. Let's jump into it!

## The Front End Part - Keyboard

Like your classic anti-planner I like to jump right in on the part where I can see immediate progress, the front end. So let's go right to the game module where I took a component based approach to filling in the play area. We'll start with the virtual keyboard, this has a few parts besides just the input, it's also showing feedback on your letter choices, where they are correct and where they are included somewhere else in the word. First I defined the keyboard as a game constant and each letter with some additional properties. This constant would be used again and again to set the keyboard back to it's initial state.

```typescript
export interface IKeyboardKey {
	letter: string;
	correct: boolean[];
	includes: boolean[];
	excludes: boolean;
}

export const US_KEYBOARD: IKeyboardKey[][] = [
	[
		{letter:'Q',correct:[],includes:[],excludes:false},
		{letter:'W',correct:[],includes:[],excludes:false},
		{letter:'E',correct:[],includes:[],excludes:false},
		{letter:'R',correct:[],includes:[],excludes:false},
		{letter:'T',correct:[],includes:[],excludes:false},
		{letter:'Y',correct:[],includes:[],excludes:false},
		{letter:'U',correct:[],includes:[],excludes:false},
		{letter:'I',correct:[],includes:[],excludes:false},
		{letter:'O',correct:[],includes:[],excludes:false},
		{letter:'P',correct:[],includes:[],excludes:false}
	],
	[
		{letter:'A',correct:[],includes:[],excludes:false},
		{letter:'S',correct:[],includes:[],excludes:false},
		{letter:'D',correct:[],includes:[],excludes:false},
		{letter:'F',correct:[],includes:[],excludes:false},
		{letter:'G',correct:[],includes:[],excludes:false},
		{letter:'H',correct:[],includes:[],excludes:false},
		{letter:'J',correct:[],includes:[],excludes:false},
		{letter:'K',correct:[],includes:[],excludes:false},
		{letter:'L',correct:[],includes:[],excludes:false}
	],
	[
		{letter:'Z',correct:[],includes:[],excludes:false},
		{letter:'X',correct:[],includes:[],excludes:false},
		{letter:'C',correct:[],includes:[],excludes:false},
		{letter:'V',correct:[],includes:[],excludes:false},
		{letter:'B',correct:[],includes:[],excludes:false},
		{letter:'N',correct:[],includes:[],excludes:false},
		{letter:'M',correct:[],includes:[],excludes:false}
	]
];
```

Each key has an object associated with it containing a few fields. The two arrays `correct` and `includes` track when we have an exact match of a letter in the right spot or a letter that is included. We use an array here to track all the different game instances. For example if we are running the standard 10 board game then there will be 10 elements in each of these arrays. Excludes is a simple boolean value and when it is true that means that the letter is not found in any of the boards in play. We use a 2D array here to define each row of the keyboard, in this instance we have the standard QWERTY setup of three rows. From this data structure you can easily imagine an `*ngFor` loop in our HTML that will render the keyboard. But first let's check out the component typescript.

```typescript
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { US_KEYBOARD } from '@app/_shared/constants/game-constants';

import { IKeyboardKey } from '@app/_shared/models';

@Component({
  selector: 'decordle-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  private _invalidWord: boolean = false;
  private _keys: IKeyboardKey[][] = US_KEYBOARD;
  private _completed: boolean = false;

  @Input() 
  set keys(keys: IKeyboardKey[][]) {
    this._keys = keys;
  }
  @Input()
  set invalidWord(invalid: boolean) {
    this._invalidWord = invalid;
  }
  @Input()
  set completed(completed: boolean) {
    this._completed = completed;
  }

  @Output() keypress = new EventEmitter<string>();

  constructor() {
    
  }

  ngOnInit(): void {
  }

  get invalidWord(): boolean { return this._invalidWord }
  get keys(): IKeyboardKey[][] { return this._keys }
  get completed(): boolean { return this._completed }

  /**
   * A key is pressed emit it out to the parent
   * 
   * @since 0.0.0
   */
  press(key: string) {
    this.keypress.emit(key);
  }

}
```

Alright, taking a look at this component we can see that it is what we call a *dumb* component, in that data handling, for instance connection to a database or any logic, happens outside of this component. That makes this a powerful black box component, where we know what comes in and out from it so it can be used in many different ways as we like. We allow an input to set the keys, but default to our `US_KEYBOARD` constant. We also have inputs for `invalidWord` and `comleted`. An `invalidWord` would be something that is not found in our dictionary, in this case the keys will turn red. The other input `completed` is a check to know that the game is over so we can turn off the keys. We also have the one output `keypress` which is of course an `EventEmitter` to let our parent component know which key has been selected.

Now the HTML for this component, where the magic happens! We use a double `*ngFor` to go through our rows and then our keys. We also specially include a delete key in the last position on line 3. The second `*ngFor` loop on line 4 is where our keys are generated. You'll see several `ngClass` tags which help our SCSS to style the keys based on some of the values in the IKeyboardKey 2D array.

```html
<div class="keyboard flex flex-col w-100" [class.disable]="completed">
	<div *ngFor="let keyrow of keys; let i = index" class="flex w-100 flex-j-center">
		<button *ngIf="i === keys.length - 1" class="decordle-key" (click)="press('del')">⌫</button>
		<button *ngFor="let key of keyrow" class="decordle-key" (click)="press(key.letter)" [ngClass]="{'excludes': key.excludes}">
			<div class="letter-results flex flex-wrap">
				<span *ngFor="let res of key.correct; let boardIndex = index" class="bg-result" [ngClass]="{'correct': res, 'includes': key.includes[boardIndex]}"></span>
			</div>

			<span class="letter">{{ key.letter }}</span>
		</button>
		<button *ngIf="i === keys.length -1" class="decordle-key" (click)="press('ent')" [disabled]="invalidWord">⏎</button>
	</div>
</div>
```

So lets take a look at line 4 specifically:

```html
<button *ngFor="let key of keyrow" class="decordle-key" (click)="press(key.letter)" [ngClass]="{'excludes': key.excludes}">
```

We've got our loop and `key` value, and we've got the class as a `decordle-key` but also the `ngClass` could be given the `excludes` class which is what dims and disables the key if it is not in any word. We've also got the click event `(click)="press(key.letter)` which triggers the `EventEmitter` in the typescript class and emits our selected letter up to the parent. Now inside this button we render the rest of the key as well as some of the feedback area

```html
<div class="letter-results flex flex-wrap">
	<span *ngFor="let res of key.correct; let boardIndex = index" class="bg-result" [ngClass]="{'correct': res, 'includes': key.includes[boardIndex]}"></span>
</div>

<span class="letter">{{ key.letter }}</span>
```

The first 3 lines are the feedback colors in the background of the key. You can see we do a loop through the correct array, so if this is a 10 board game then 10 of these areas will be created. The `ngClass` here checks against the correct and includes array for this key then assigns the class as needed. Now this gives us all the nice feedback as the game progresses. Finally in the last line here we set the letter for the key. There is of course some SCSS that goes with this but I'm not going to include that in this article and leave that up to you!

## The Front End Part - Word Area

Now that the user can do some input, we are ready to build the guessing area and get the party started. This is a bit more complicated but may still be considered a *dumb* component, it has some handling of logic but the initial information is still be processed from a parent. This is a bit longer so first let's look at the inputs of the component:

```typescript
private _invalidWord: boolean = false;
private _numGuesses: number = GUESSES;
private _showAnswer: boolean = false;
private _guesses!: string[][];

@Input() answer!: string;
@Input() 
set guesses(guesses: string[][]) {
  this._guesses = guesses;
}

@Input()
set invalidWord(invalid: boolean) {
  this._invalidWord = invalid;
}
@Input() 
set numGuesses(numGuesses: number) {
  this._numGuesses = numGuesses;
}
@Input()
set showAnswer(show: boolean) {
  this._showAnswer = show;

  if (show) {
    setTimeout(() => {
      this.result.emit(this.correctIndex);
    }, 500);
  }
}

@Input() checkAnswer!: Subject<{guess: string, index: number}>;

...

get invalidWord(): boolean { return this._invalidWord }
get numGuesses(): number { return this._numGuesses }
get showAnswer(): boolean { return this._showAnswer }
get guesses(): string[][] { return this._guesses }
```

Hopefully these are a bit obvious, invalid word lets the board know that the selection by the user is not in our dictionary and gives the user those red letter feedbacks. We set the rows in the word area, the number of guesses allowed with `numGuesses`. If the game is over we need to let the word area know it can `showAnswer`. Then we have the `guesses` that the user has already made in a 2D string array, essentially a guess list. The `answer` is also an input, set once at the start of a game so we don't need to use a input setter with it. Lastly we have `checkAnswer` as a `Subject`, that let's us subscribe to it and do updates automatically on changes.

We also have two outputs:

```typescript
@Output() matchedLetters: EventEmitter<{correct: boolean[], includes: boolean[]}> = new EventEmitter<{correct: boolean[], includes: boolean[]}>();
@Output() result: EventEmitter<number> = new EventEmitter<number>();
```

The first, `matchedLetters`, emits the correct and includes values for this word. The `result` output is used when and if the user guesses the word correctly so we know at which guess index the user won this word. Easy peasy!

The big part of this component happens OnInit so let's dive into that:

```typescript
ngOnInit(): void {
  this.correctLetters = Array(this.numGuesses).fill(null).map(() => [false,false,false,false,false]);
  this.includesLetters = Array(this.numGuesses).fill(null).map(() => [false,false,false,false,false]);

  this.checkAnswer.subscribe(answer => {
    if (!this.correct) {
      this.correct = answer.guess.toLowerCase() === this.answer;

      for (let i = 0; i < WORD_LEN; i++) {
        this.correctLetters[answer.index][i] = answer.guess.charAt(i) === this.answer.charAt(i);
        this.includesLetters[answer.index][i] = this.answer.includes(answer.guess.charAt(i));
      }

      this.matchedLetters.emit({correct: this.correctLetters[answer.index], includes: this.includesLetters[answer.index]});
      
      if (this.correct) {
        this.correctIndex = answer.index
        this.result.emit(answer.index);
      }
    }

    this.currentIndex++;
    
    this.ref.markForCheck();
  })
}
```

We fill our local correct and includes letters arrays each with a 5 value array of booleans. This corresponds to each letter in each guess. `Array(this.numGuesses)` sets the length of each of these arrays to match the number of guesses, we then map each of those arrays with our boolean arrays.

Next we have our subscription to check the answer. Firstly if the word is correct and already been guessed we can just skip all this nonsense. If not, check the answer to the provided answer, check each character to see if it is an exact, correct, match or if it is somewhere, includes, in the word. Emit this result with the `matchedLetters` output and finally, if the whole word is correct then send out the index that we are at to let the parent keep track of that. 

Now the HTML

That gives you all the pieces you need for this component!

## The Front End - Putting it Together

