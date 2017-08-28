import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as jQuery from 'jquery';
import { DatePipe } from '@angular/common';
//import {epi} from 'js-contador/jquery.epiclock.min.js';

declare var $:any;
@Component({
  selector: 'redessociales',
  templateUrl: './redessociales.component.html',
  styleUrls: ['./redessociales.component.css'],
  })

export class RedesComponent{

  @ViewChild('selectElem') el:ElementRef;
    ngAfterViewInit() {

      ;(function($){
        
        /**
         * jQuery function to prevent default anchor event and take the href * and the title to make a share popup
         *
         * @param  {[object]} e           [Mouse event]
         * @param  {[integer]} intWidth   [Popup width defalut 500]
         * @param  {[integer]} intHeight  [Popup height defalut 400]
         * @param  {[boolean]} blnResize  [Is popup resizeabel default true]
         */
        $.fn.customerPopup = function (e, intWidth, intHeight, blnResize) {
          
          // Prevent default anchor event
          e.preventDefault();
          
          // Set values for window
          intWidth = intWidth || '500';
          intHeight = intHeight || '400';
          let strResize = (blnResize ? 'yes' : 'no');
      
          // Set title and open popup with focus on it
          var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
              strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,            
              objWindow = window.open(this.attr('href'), strTitle, strParam).focus();
        }
        
        /* ================================================== */
        
        $(document).ready(function ($) {
          $('.customer.share').on("click", function(e) {
            $(this).customerPopup(e);
          });
        });
          
      }(jQuery));

   }
}