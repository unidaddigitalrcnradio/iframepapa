import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// Importamos la clase del servicio
import {NoticiasNewService} from '../noticiasnew/noticiasnew.service';
import {ArrayNoticias} from '../noticias/arraynoticia';
import {Noticia} from '../noticias/noticias';

import * as jQuery from 'jquery';
import { DatePipe } from '@angular/common';
import { SwiperModule } from 'angular2-useful-swiper';


// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'noticiasnew',
  templateUrl: './noticiasnew.component.html',
  styleUrls: ['./noticiasnew.component.css'],
  providers:[NoticiasNewService]
})

export class NoticiaNewComponent {
public jsonFm;
public jsonRcn;
public errorMessage;
public arrayFM: Array<Noticia>;
public arrayRCN: Array<Noticia>;
public allNoti;
public finNoti;
public finBloque0;
public finBloque1;
public finBloque2;
public finBloque3;
public contNoticia = 'bloque2';

@ViewChild('selectElem') el:ElementRef;

config: SwiperOptions = {
    slidesPerView: 3,
    paginationClickable: true,
    spaceBetween: 30,
    loop:true,
    autoplay: 4000,
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        }, 
        520: {
            slidesPerView: 1,
            spaceBetween: 10
        },
    }
}


constructor(private _notiServ: NoticiasNewService){
    let jsonFm = this._notiServ.getJson('http://www.lafm.com.co/wp-json/wp/v2/posts?categories=12556');
    console.log(jsonFm);
    for (let _p of jsonFm){
        _p.logomarca = 'http://image.rcn.com.co.s3.amazonaws.com/rcnradio/lafm.png';
        let valor;
        if (_p._links['wp:featuredmedia']){
            valor = _p._links['wp:featuredmedia']['0']['href'];
        }else{
            valor = 'sinImagen';
        }
        _p.imgjson = valor;
    }
    this.arrayFM = this._notiServ.crearObjNoti(jsonFm);


    let jsonRcn = this._notiServ.getJson('http://www.rcnradio.com/wp-json/wp/v2/posts?categories=45691');
    console.log(jsonRcn);
    for (let _p of jsonRcn){
        _p.logomarca = 'http://image.rcn.com.co.s3.amazonaws.com/rcnradio/rcnradio.png';
        let valor;
        if (_p._links['wp:featuredmedia']){
            valor = _p._links['wp:featuredmedia']['0']['href'];
        }else{
            valor = 'sinImagen';
        }
        _p.imgjson = valor;
    }
    this.arrayRCN = this._notiServ.crearObjNoti(jsonRcn);

    this.allNoti = this.unirArchivos(this.arrayFM , this.arrayRCN );
    this.finNoti = this.traerimagenes(this.allNoti);

  }

    unirArchivos(_array1, _array2){
        return this._notiServ.crearListaCompleta(_array1, _array2);
    }

    traerimagenes(_arrayFinal){
        return this._notiServ.addImagenJson(_arrayFinal);
    }
    add6(_array,_bloque){
        let _array6:Noticia[] = [];
        switch (_bloque) {
            case 0:
                for (var i = 0; i < 3; i++) {
                    _array6.push(_array[i]);
                }
                break;
            case 1:
                for (var i = 0; i < 6; i++) {
                    _array6.push(_array[i]);
                }
                break;
            case 2:
                for (var i = 6; i < 12; i++) {
                    _array6.push(_array[i]);
                }
                break;
            case 3:
                for (var i = 12; i < 18; i++) {
                    _array6.push(_array[i]);
                }
                break;

            default:
                for (var i = 0; i < _array.length; i++) {
                    _array6.push(_array[i]);
                }
                break;
        }
        return _array6;
    }
    agregarNoticias(){
        if (this.contNoticia === 'bloque2'){
                    // Usamos jQuery
            $('.bloque2').slideToggle();
            this.contNoticia = 'bloque3';

        }else if (this.contNoticia === 'bloque3'){
                    // Usamos jQuery
            $('.bloque3').slideToggle();
            this.contNoticia = 'bloque4';
        }

    }
}