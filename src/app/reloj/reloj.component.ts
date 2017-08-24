import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as jQuery from 'jquery';
import { DatePipe } from '@angular/common';
//import {epi} from 'js-contador/jquery.epiclock.min.js';

declare var $:any;
@Component({
  selector: 'reloj',
  templateUrl: './reloj.component.html',
  styleUrls: ['./reloj.component.css'],
  })

export class RelojComponent{

  @ViewChild('selectElem') el:ElementRef;
    ngAfterViewInit() {
      function getTimeRemaining(endtime) {
        var now = new Date().getTime();
        var t = endtime -  now;
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
      }
      
      function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
      
        function updateClock() {
          var t = getTimeRemaining(endtime);
      
          daysSpan.innerHTML = String(t.days);
          hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
          minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
          secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
      
          if (t.total <= 0) {
            clearInterval(timeinterval);
          }
        }
      
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
      }
     
      var fechaEvento =new Date(2017,8,6,16).getTime();
      initializeClock('clockdiv', fechaEvento);

   }
}