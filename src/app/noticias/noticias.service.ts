import {Injectable}   from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import "rxjs/add/operator/map";

import {Noticia} from './noticias';

@Injectable()
export class NoticiasService {

    constructor(private _http: Http) { }


   	getJson(_url){
        
        // petición por get a esa url de un api rest de pruebas
        let ObjJson = this._http.get(_url)
                            .map(res => res.json());    
        return ObjJson;
    }

    crearObjNoti(_json){
    
    	let ArregloNoticias:Noticia[]=[];

    	for(let _j of _json){		
    		//console.log(_j.imgJson);
    		let n = new Noticia(_j.id, _j.title.rendered, _j.excerpt.rendered, _j.imgJson, _j.date, _j.link, _j.logoMarca);	
    	ArregloNoticias.push(n);
    	}

    	return ArregloNoticias;
	}

	crearListaCompleta(noti1: Noticia[] ,not12: Noticia[]){
		let ArregloNoticias:Noticia[]=[];

		for(let _n of noti1)
		{
			ArregloNoticias.push(_n);

		}

		for (let _n2 of not12)
		{

			ArregloNoticias.push(_n2);
		}

		
		var n = ArregloNoticias.length;
		var k;

			
		for (var m = n; m <= 0; m--) 
		{
			for (var i = 0; i < n - 1; i++) {
				k = 1 +i;
				if(ArregloNoticias[i].dateNoti > ArregloNoticias[k].dateNoti)
				{
					this.swapElements(i,k, ArregloNoticias);
				}
			}
		
			
		}
		return ArregloNoticias;

	}

	 swapElements(i: number, j: number, arg: Noticia[]) 
	{
		var temp;
		temp = 	arg[i];
		arg[i] = arg[j];
		arg[j] = temp;					

		 
	}
}