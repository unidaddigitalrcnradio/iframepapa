import { Component } from '@angular/core';
 
// Importamos la clase del servicio
import {NoticiasService} from '../noticias/noticias.service';
import {ArrayNoticias} from '../noticias/arraynoticia';
import {Noticia} from '../noticias/noticias';
 
@Component({
  selector: 'noticias',
  templateUrl: './noticias.component.html',
  providers:[NoticiasService]
})

export class NoticiaComponent{
	private jsonFm;
    private jsonRcn;
	public errorMessage;
    private arrayFM: Noticia[] = [];
    private arrayRCN: Noticia[] = [];
    public allNoti: Noticia[] = [];
    private _imgJason;


	constructor(private _notiServ: NoticiasService){

        

this._notiServ.getJson('http://www.lafm.com.co/wp-json/wp/v2/posts?filter[cat]=50')
                                    .subscribe(
                                        result => {
                                                this.jsonFm = result;
                                                //Recorrer el arreglo
                                                
                                                for(let _post of this.jsonFm){                                                  
                                                    // this._notiServ.getJson(_post._links['wp:featuredmedia']['0']['href']).subscribe(
                                                    // result =>{
                                                    //     let rst2 = result ;

                                                    //     _post.imgJson = rst2.source_url;
                                                    //     _post.logoMarca = 'laFM';
                                                    // },
                                                    // error =>{
                                                    //     this.errorMessage = <any>error;
                                                    //     if(this.errorMessage !== null){
                                                    //         console.log(this.errorMessage);
                                                    //         alert("Error en la peticion de Imagenes");
                                                    //     }
                                                    // });
                                                     if(_post._links['wp:featuredmedia']){
                                                       this._notiServ.getJson(_post._links['wp:featuredmedia']['0']['href']).subscribe(
                                                    result =>{
                                                        this._imgJason = result ;

                                                        _post.imgJson = this._imgJason.source_url;
                                                        _post.logoMarca = 'laFM';
                                                    },
                                                    error =>{
                                                        this.errorMessage = <any>error;
                                                        if(this.errorMessage !== null){
                                                            console.log(this.errorMessage);
                                                            alert("Error en la peticion de Imagenes");
                                                        }
                                                    }); 
                                                   } else{
                                                       _post.imgJson = 'https://www.elheraldo.co/sites/default/files/articulo/2017/06/30/papa_francisco.jpg';
                                                        _post.logoMarca = 'LaFM';
                                                   } 
                                                }
                                                console.log(this.jsonFm);
                                                this.arrayFM = this._notiServ.crearObjNoti(this.jsonFm);
                                                //this.nuevaArray = new ArrayNoticias(this.arrayFM);
                                                console.log(this.arrayFM);
                                                                                         
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
                                                
                                                 for(let _post of this.jsonRcn){ 
                                                //     this._notiServ.getJson(_post._links['wp:featuredmedia']['0']['href']).subscribe(
                                                //     result =>{
                                                //         let rst2 = result ;

                                                //         _post.imgJson = rst2.source_url;
                                                //         _post.logoMarca = 'laFM';
                                                //     },
                                                //     error =>{
                                                //         this.errorMessage = <any>error;
                                                //         if(this.errorMessage !== null){
                                                //             console.log(this.errorMessage);
                                                //             alert("Error en la peticion de Imagenes");
                                                //         }
                                                //     });
                                                    if(_post._links['wp:featuredmedia']){
                                                       this._notiServ.getJson(_post._links['wp:featuredmedia']['0']['href']).subscribe(
                                                    result =>{
                                                        this._imgJason = result ;

                                                        _post.imgJson = this._imgJason.source_url;
                                                        _post.logoMarca = 'RcnBasica';
                                                    },
                                                    error =>{
                                                        this.errorMessage = <any>error;
                                                        if(this.errorMessage !== null){
                                                            console.log(this.errorMessage);
                                                            alert("Error en la peticion de Imagenes");
                                                        }
                                                    }); 
                                                   } else{
                                                       _post.imgJson = 'https://www.elheraldo.co/sites/default/files/articulo/2017/06/30/papa_francisco.jpg';
                                                        _post.logoMarca = 'RcnBasica';
                                                   }                                                
                                                    
                                                }
                                               
                                                this.arrayRCN = this._notiServ.crearObjNoti(this.jsonRcn);
                                                this.allNoti = this._notiServ.crearListaCompleta(this.arrayFM, this.arrayRCN);
                                                console.log(this.allNoti);
                                        },
                                        error => {
                                            this.errorMessage = <any>error;
                                             
                                            if(this.errorMessage !== null){
                                                console.log(this.errorMessage);
                                                alert("Error en la petición");
                                            }
                                        }
                                    );


	}


}