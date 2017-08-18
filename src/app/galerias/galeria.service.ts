import {Injectable}   from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import "rxjs/add/operator/map";

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

		// let ArregloGaleria:Galeria[]=[];
		// for(let _g of _json){
		// 	let n =  new Galeria(_g.id, _g.title, _g.content.rendered, _g.date);
		// 	ArregloGaleria.push(n);
		// }
	 //    return ArregloGaleria;
	}

}