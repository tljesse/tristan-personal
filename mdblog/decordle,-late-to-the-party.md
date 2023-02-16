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
