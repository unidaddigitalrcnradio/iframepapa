import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as jQuery from 'jquery';
import {epi} from 'js-contador/jquery.epiclock.min.js';

declare var $:any;
@Component({
  selector: 'reloj',
  templateUrl: './reloj.component.html',
  styleUrls: ['./reloj.component.css'],
  })

export class RelojComponent{

  @ViewChild('selectElem') el:ElementRef;
    public elemento;
    ngAfterViewInit() {

   }
}