import { Component } from '@angular/core';
 
// Importamos la clase del servicio
import {NoticiasService} from '../noticias/noticias.service';
import {ArrayNoticias} from '../noticias/arraynoticia';
import {Noticia} from '../noticias/noticias';
 
@Component({
  selector: 'noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
  providers:[NoticiasService]
})

export class NoticiaComponent{
	public jsonFm;
  public jsonRcn;
	public errorMessage;
  public arrayFM: Noticia[] = [];
  public arrayRCN: Noticia[] = [];
  public allNoti: Noticia[] = [];

	constructor(private _notiServ: NoticiasService){  


this._notiServ.getJson('http://www.lafm.com.co/wp-json/wp/v2/posts?filter[cat]=50')
                                    .subscribe(
                                        result => {
                                                this.jsonFm = result;
                                                //Recorrer el arreglo
                                                
                                                for(let _p of this.jsonFm){                                                  
                                                     _p.logomarca = 'http://www.lafm.com.co/wp-content/uploads/Logo-FM_FondoBlanco.png';
                                                     
                                                     if(_p._links['wp:featuredmedia']){
                                                       this._notiServ.getJson(_p._links['wp:featuredmedia']['0']['href']).subscribe(
                                                    result =>{
                                                        let _imgJason = result ;
                                                        var valorUrl:string = _imgJason.source_url;
                                                        _p.imgjson = valorUrl;                                          
                                                    },
                                                    error =>{
                                                        this.errorMessage = <any>error;
                                                        if(this.errorMessage !== null){
                                                            console.log(this.errorMessage);
                                                            alert("Error en la peticion de Imagenes");
                                                        }
                                                    }); 
                                                   } else{
                                                       _p.imgjson = 'https://www.elheraldo.co/sites/default/files/articulo/2017/06/30/papa_francisco.jpg';
                                                      
                                                   } 
                                                }
                                                //console.log(this.jsonFm);
                                                this.arrayFM = this._notiServ.crearObjNoti(this.jsonFm);
                                                
                                                //console.log(this.arrayFM);
                                                                                         
                                        },
                                        error => {
                                            this.errorMessage = <any>error;
                                             
                                            if(this.errorMessage !== null){
                                                console.log(this.errorMessage);
                                                alert("Error en la petición");
                                            }
                                        }
                                    );

this._notiServ.getJson('http://www.rcnradio.com/wp-json/wp/v2/posts?filter[cat]=23')
                                    .subscribe(
                                        result => {
                                                this.jsonRcn = result;
                                                //Recorrer el arreglo
                                                
                                                 for(let _p of this.jsonRcn){ 
                                                     _p.logomarca = 'http://emisorasenvivo.co/sites/default/files/radio/logos/logo-rcn-radio.jpg';
                                                    if(_p._links['wp:featuredmedia']){
                                                       this._notiServ.getJson(_p._links['wp:featuredmedia']['0']['href']).subscribe(
                                                    result =>{
                                                        let _imgJason = result ;

                                                         var valorUrl:string = _imgJason.source_url;
                                                        _p.imgjson = valorUrl;  
                                                       },
                                                    error =>{
                                                        this.errorMessage = <any>error;
                                                        if(this.errorMessage !== null){
                                                            console.log(this.errorMessage);
                                                            alert("Error en la peticion de Imagenes");
                                                        }
                                                    }); 
                                                   } else{
                                                       _p.imgjson = 'https://www.elheraldo.co/sites/default/files/articulo/2017/06/30/papa_francisco.jpg';
                                                   }                                                
                                                    
                                                }
                                               this.arrayRCN = this._notiServ.crearObjNoti(this.jsonRcn);
                                                   this.allNoti = this.unirArchivos(this.arrayFM , this.arrayRCN );
                                        },
                                        error => {
                                            this.errorMessage = <any>error;
                                             
                                            if(this.errorMessage !== null){
                                                console.log(this.errorMessage);
                                                alert("Error en la petición");
                                            }
                                        }
                                    );

   console.log(this.allNoti);
  }

unirArchivos(_array1, _array2){
  return this._notiServ.crearListaCompleta(_array1, _array2);

}




}