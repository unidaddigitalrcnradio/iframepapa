import { Component } from '@angular/core';
 
// Importamos la clase del servicio
import {GaleriaService} from '../galerias/galeria.service';
import {Galeria} from '../galerias/galeria';
import $ from 'jquery/dist/jquery';
 
@Component({
  selector: 'galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
  providers:[GaleriaService]
})

export class GaleriaComponent{
public galeriaJson;
public errorMessage;
public objGaleria;

constructor(private _galServ: GaleriaService){
        this._galServ.getJson('http://www.rcnradio.com/wp-json/wp/v2/posts/364737')
                                    .subscribe(
                                        result => {
                                                this.galeriaJson = result;
                                                this.objGaleria = this._galServ.crearObjGaleria(this.galeriaJson);

                                                console.log(this.objGaleria);
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
}