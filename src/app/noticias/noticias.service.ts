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
    	//let valor1 = _json.length;
    	//console.log(_json);
    	for (var i = 0; i < _json.length; i++) {
    		
    		let n = new Noticia(_json[i].id, _json[i].title.rendered, _json[i].excerpt.rendered, _json[i].date, _json[i].link, _json[i].logomarca, _json[i].imgjson, _json[i].content.rendered);	
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

			
		for (var m = n; m >= 0; m--) 
		{
			for (var i = 0; i < n - 1; i++) {
				k = 1 +i;
				if(ArregloNoticias[i].dateNoti < ArregloNoticias[k].dateNoti)
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