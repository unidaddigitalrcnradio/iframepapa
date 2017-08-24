import { Component } from '@angular/core';
// Importamos la clase del servicio
import {NoticiasService} from '../noticias/noticias.service';
import {ArrayNoticias} from '../noticias/arraynoticia';
import {Noticia} from '../noticias/noticias';

// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

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
public finBloque1;
public finBloque2;
public finBloque3;
public contNoticia = 'bloque2';

constructor(private _notiServ: NoticiasService){
    this._notiServ.getJson('http://www.lafm.com.co/wp-json/wp/v2/posts?categories=12556')
                                    .subscribe(
                                        result => {
                                                this.jsonFm = result;
                                                //Recorrer el arreglo
                                                for (let _p of this.jsonFm){
                                                    _p.logomarca = 'http://image.rcn.com.co.s3.amazonaws.com/rcnradio/fm.jpg';
                                                    let valor;
                                                    if (_p._links['wp:featuredmedia']){
                                                        valor = _p._links['wp:featuredmedia']['0']['href'];
                                                    }else{
                                                        valor = 'sinImagen';
                                                    }
                                                    _p.imgjson = valor;
                                                }
                                                this.arrayFM = this._notiServ.crearObjNoti(this.jsonFm);
                                                this._notiServ.getJson('http://www.rcnradio.com/wp-json/wp/v2/posts?categories=45691')
                                                .subscribe(
                                                    result => {
                                                            this.jsonRcn = result;
                                                            //Recorrer el arreglo
                                                            for (let _p of this.jsonRcn){
                                                                // tslint:disable-next-line:max-line-length
                                                                _p.logomarca = 'http://image.rcn.com.co.s3.amazonaws.com/rcnradio/rcnradio.jpg';
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
                                                                this.finBloque1 = this.add6(this.finNoti, 1);
                                                                this.finBloque2 = this.add6(this.finNoti, 2);
                                                                this.finBloque3 = this.add6(this.finNoti, 3);
                                                            },
                                                    error => {
                                                        this.errorMessage = <any>error;
                                                        if (this.errorMessage !== null){
                                                            console.log(this.errorMessage);
                                                            alert('Error en la petición');
                                                        }
                                                    }
                                                );
                                            },
                                        error => {
                                            this.errorMessage = <any>error;
                                            if (this.errorMessage !== null){
                                                console.log(this.errorMessage);
                                                alert('Error en la petición');
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
    add6(_array,_bloque){
        let _array6:Noticia[] = [];
        switch (_bloque) {
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