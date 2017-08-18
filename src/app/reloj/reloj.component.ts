import { Component } from '@angular/core';
import * as jQuery from 'jquery';
declare var objJs:any;
@Component({
  selector: 'reloj',
  templateUrl: './reloj.component.html',
  styleUrls: ['./reloj.component.css'],
  })

export class RelojComponent{

    shaObj: any;
    hash: String;

    constructor(){
    //  this.shaObj = jQuery('#text').objJs.epiclock({mode: EC_COUNTDOWN, format: 
    //    'V{<sup> Dias</sup>} x{<sup> Horas</sup>} i{<sup> Minutos</sup>} s{<sup> Segundos</sup>}', 
    //    target: 'Sep 6, 2017 18:00:00'}).clocks(EC_RUN);  
    }
}