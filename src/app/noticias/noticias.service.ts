	// tslint:disable-next-line:indent
import {Injectable,Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Cors} from 'cors';
import { DOCUMENT } from '@angular/platform-browser';

import {Noticia} from './noticias';

@Injectable()
export class NoticiasService {
	// tslint:disable-next-line:indent
	constructor(private _http: Http, @Inject(DOCUMENT) private document: any) { }

	getJson(_url){
		const headers = new Headers();
		headers.append('Origin', this.document.location.href);
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET');
		headers.append('Access-Control-Allow-Origin', '*');

		let ObjJson = this._http.get(_url).map(res => res.json());
		return ObjJson;
	}
	
	crearObjNoti(_json){
    	
		let ArregloNoticias:Noticia[] = [];

    	for (let i = 0; i < _json.length; i++) {
		
			var id = _json[i].id;
			var titulo:string = _json[i].title.rendered;
			var teaser: string = _json[i].excerpt.rendered;

			var fecha:Date = _json[i].date;
			var rutaUrl = _json[i].link;
			var logoMarca = _json[i].logomarca;
			var imgjson = _json[i].imgjson;
			var contenido = _json[i].content.rendered;
			if (teaser === ''){
				let contRemp:string = contenido;
				contRemp = this.arreglarStrings('<p style="text-align: justify;">','', contRemp).trim();
				contRemp = this.arreglarStrings('<!--more-->','', contRemp);
				contRemp = this.arreglarStrings('<p>','', contRemp);
				contRemp = this.arreglarStrings('</p>','', contRemp);
				contRemp = this.arreglarStrings('<strong>','', contRemp);
				contRemp = this.arreglarStrings('</strong>','', contRemp);
				contRemp = this.arreglarStrings('<br />','',contRemp);
				contRemp = contRemp.trim();
				teaser = contRemp.substring(0,73);
			}else{
				teaser = teaser.trim();
				teaser = this.arreglarStrings('<p>','', teaser);
				teaser = this.arreglarStrings('</p>','', teaser);
				teaser = this.arreglarStrings('<strong>','', teaser);
				teaser = this.arreglarStrings('</strong>','', teaser);
			}
			//console.log(teaser);
			teaser = this.arreglarStrings('<p>','',teaser);
			teaser = this.arreglarStrings('</p>','',teaser);
    		let n = new Noticia(id, titulo.substring(0,73) ,teaser.substring(0,78) ,fecha , rutaUrl,logoMarca , imgjson ,contenido);	
    		ArregloNoticias.push(n);
		}
		return ArregloNoticias;
	}

//Crea una lista completa y la ordena 
	crearListaCompleta(noti1: Noticia[] ,noti2: Noticia[]){
		let ArregloNoticias1:Noticia[] = [];

		for (const _n of noti1)
		{ArregloNoticias1.push(_n);

		}

		for (const _n2 of noti2)
		{ArregloNoticias1.push(_n2);
		}

		
		var n = ArregloNoticias1.length;
		var k;

			
		for (var m = n; m >= 0; m--) 
		{
			for (var i = 0; i < n - 1; i++) {
				k = 1 +i;
				if(ArregloNoticias1[i].dateNoti < ArregloNoticias1[k].dateNoti)
				{
					this.swapElements(i,k, ArregloNoticias1);
				}
			}
		
			
		}
		return ArregloNoticias1;

	}

	 swapElements(i: number, j: number, arg: Noticia[]){
		var temp;
		temp = 	arg[i];
		arg[i] = arg[j];
		arg[j] = temp;

	}
	addImagenJson(allnoti){
		let errorMessage;
		for (let i = 0; i < allnoti.length; i++) {
			let imgDatos;
			let valor:string = allnoti[i].urlImg;
			if (valor === 'sinImagen'){
				allnoti[i].urlImg = 'http://image.rcn.com.co.s3.amazonaws.com/rcnradio/prev.jpg';
			}else{
				this.getJson(valor).subscribe(
					result => {
						imgDatos = result;
						allnoti[i].urlImg = imgDatos.source_url;
					
					},
					error => {
						errorMessage = <any>error;
						if (errorMessage !== null){
							allnoti[i].urlImg = 'http://image.rcn.com.co.s3.amazonaws.com/rcnradio/prev.jpg';
							console.log(errorMessage);
						}
					});
			}
		}
	return allnoti;
	}

	arreglarStrings(_dato, _remplazo, _string:string){
		let StringArreglado = _string.replace(_dato,_remplazo);
		return StringArreglado;
	}
}