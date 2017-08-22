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
public finNoti: Noticia[];

constructor(private _notiServ: NoticiasService){
    this._notiServ.getJson('http://www.lafm.com.co/wp-json/wp/v2/posts?filter[cat]=50')
                                    .subscribe(
                                        result => {
                                                this.jsonFm = result;
                                                //Recorrer el arreglo
                                                for(let _p of this.jsonFm){
                                                    _p.logomarca = 'http://image.rcn.com.co.s3.amazonaws.com/lafm/logof.png';
                                                    let valor;
                                                    if(_p._links['wp:featuredmedia']){
                                                        valor = _p._links['wp:featuredmedia']['0']['href'];
                                                    }else{
                                                        valor = 'http://image.rcn.com.co.s3.amazonaws.com/lafm/prev.jpg';
                                                    }
                                                    _p.imgjson = valor;
                                                }
                                                this.arrayFM = this._notiServ.crearObjNoti(this.jsonFm);
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
                                                for(let _p of this.jsonRcn){
                                                    _p.logomarca = 'http://image.rcn.com.co.s3.amazonaws.com/lafm/logor.png';
                                                    let valor;
                                                    if(_p._links['wp:featuredmedia']){
                                                        valor = _p._links['wp:featuredmedia']['0']['href'];
                                                    }else{
                                                        valor = 'http://image.rcn.com.co.s3.amazonaws.com/lafm/prev.jpg';
                                                    }
                                                    _p.imgjson = valor;
                                                }
                                                    //  _p.logomarca = 'http://image.rcn.com.co.s3.amazonaws.com/rcnradio/logor.png';
                                                    // if(_p._links['wp:featuredmedia']){
                                                    //    this._notiServ.getJson(_p._links['wp:featuredmedia']['0']['href']).subscribe(
                                                    //     result =>{
                                                    //         let _imgJason = result ;
                                                    //         //var valorUrl:string = _imgJason.source_url;
                                                    //         var valorUrl:string = 'http://image.rcn.com.co.s3.amazonaws.com/lafm/prev.jpg';
                                                    //         _p.imgjson = valorUrl;  
                                                    //     },
                                                    //     error =>{
                                                    //         this.errorMessage = <any>error;
                                                    //         if(this.errorMessage !== null){
                                                    //             console.log(this.errorMessage);
                                                    //             alert("Error en la peticion de Imagenes");
                                                    //         }
                                                    //     }); 
                                                    // } else{
                                                    //    _p.imgjson = 'http://image.rcn.com.co.s3.amazonaws.com/lafm/prev.jpg';
                                                    // }
                                                    this.arrayRCN = this._notiServ.crearObjNoti(this.jsonRcn);
                                                    console.log(this.arrayRCN);
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
  }

    unirArchivos(_array1, _array2){
        let resultado = this._notiServ.crearListaCompleta(_array1, _array2);
        return this._notiServ.addImagenJson(resultado);
    }

}