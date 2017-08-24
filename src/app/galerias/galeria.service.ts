	// tslint:disable-next-line:indent
import {Injectable, } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Galeria} from './galeria';

@Injectable()
export class GaleriaService {

    constructor(private _http: Http) { }

    getJson(_url){
        // petición por get a esa url de un api rest de pruebas
        let ObjJson = this._http.get(_url)
                            .map(res => res.json());
        return ObjJson;
    }

	crearObjGaleria(_json){
		let ArregloGaleria:Galeria[] = [];
		for (let _g of _json){
			let n =  new Galeria(_g.id, _g.title, _g.content.rendered, _g.date);
			ArregloGaleria.push(n);
		}
	    return ArregloGaleria;
	}

	buscarPalabra(_miCadena, _buscar:string){
		let cuenta = 0;
		let posicion = _miCadena.search(_buscar);
		// while ( posicion != -1 ) {
		//    cuenta++;
		//    posicion = _miCadena.indexOf(_buscar,posicion+1);
		// }
		return posicion;
	}
	extraerImagen(_cadena:string){
		let cadenaMod:string = _cadena;
		let posMove = 0;
		let arrayImg:String[] = [];
		let _cadenaSplit = _cadena.split('<img');
		let cuantoImgExisten = _cadenaSplit.length;
		
		for (var index = 0; index < cuantoImgExisten -1; index++) {
			let posicionIni = this.buscarPalabra(cadenaMod, '<img');
			cadenaMod = cadenaMod.substr(posicionIni, cadenaMod.length);
			let posicionFin = this.buscarPalabra(cadenaMod, '/>');
			let img = cadenaMod.substring(0, posicionFin+2);
			arrayImg.push(img);
			cadenaMod = cadenaMod.substr(posicionFin+2, cadenaMod.length)
			
		}
		return arrayImg;
	}
	extraerURLimagen(_arreglo){
		let arregloFinal:string[] = [];
		for (var i = 0; i < _arreglo.length; i++) {
			let posicionFin = this.buscarPalabra(_arreglo[i],'" ');

			let url = _arreglo[i].substring(10,posicionFin);
			arregloFinal.push(url);
		}
		return arregloFinal;
	}

}