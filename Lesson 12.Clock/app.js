'use strict'

/* eslint-disable no-undef */

const globalClock = new Clock('.globalClock');
const currentClock = new Clock('.currentClock');
const currentClockstartBtn = document.querySelector('.currentClockActions [data-action="start"]');
const currentClockstopBtn = document.querySelector('.currentClockActions [data-action="stop"]');


currentClockstartBtn.addEventListener('click', () => {
    currentClock.start();
});

currentClockstopBtn.addEventListener('click', () => {
    currentClock.stop();
});


console.log(globalClock)

const  currentTimer = new Timer({
    selector: '.currentTimer'
});

console.log( currentTimer );
console.log(currentTimer.__proto__  === Timer.prototype)