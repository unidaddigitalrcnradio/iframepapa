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
public arrayFM: Array<Noticia>;
public arrayRCN: Array<Noticia>;
public allNoti;
public finNoti;

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
                                                        valor = 'sinImagen';
                                                    }
                                                    _p.imgjson = valor;
                                                }
                                                this.arrayFM = this._notiServ.crearObjNoti(this.jsonFm);
                                                this._notiServ.getJson('http://www.rcnradio.com/wp-json/wp/v2/posts?filter[cat]=23')
                                                .subscribe(
                                                    result => {
                                                            this.jsonRcn = result;
                                                            //Recorrer el arreglo
                                                            for(let _p of this.jsonRcn){
                                                                // tslint:disable-next-line:max-line-length
                                                                _p.logomarca = 'http://image.rcn.com.co.s3.amazonaws.com/rcnradio/logor.png';
                                                                let valor;
                                                                if (_p._links['wp:featuredmedia']){
                                                                    valor = _p._links['wp:featuredmedia']['0']['href'];
                                                                }else{
                                                                    valor = 'sinImagen';
                                                                }
                                                                _p.imgjson = valor;
                                                            }
                                                                this.arrayRCN = this._notiServ.crearObjNoti(this.jsonRcn);

                                                                this.allNoti = this.unirArchivos(this.arrayFM , this.arrayRCN );
                                                                this.finNoti = this.traerimagenes(this.allNoti);
                                                            },
                                                    error => {
                                                        this.errorMessage = <any>error;
                                                        if(this.errorMessage !== null){
                                                            console.log(this.errorMessage);
                                                            alert("Error en la petición");
                                                        }
                                                    }
                                                );
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
        return this._notiServ.crearListaCompleta(_array1, _array2);
    }

    traerimagenes(_arrayFinal){
        return this._notiServ.addImagenJson(_arrayFinal);
    }
}