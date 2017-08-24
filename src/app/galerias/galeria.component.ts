import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
 
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

export class GaleriaComponent implements AfterViewInit{
@ViewChild('wrapper')wrapper:ElementRef;

ngAfterViewInit(){
    this.lightboxImages();
  }
lightboxImages(){
//let images = this.wrapper.nativeElement.querySelector('img','.post-body');
//    console.log(images);
  }

public galeriaJson;
public errorMessage;
public objGaleria;


constructor(private _galServ: GaleriaService){

        this._galServ.getJson('http://www.lafm.com.co/wp-json/wp/v2/posts/63773')
                                    .subscribe(
                                        result => {
                                                this.galeriaJson = result;
                                                //console.log(this.galeriaJson);
                                                //this.objGaleria = this._galServ.crearObjGaleria(this.galeriaJson);
                                                let htmlContent = this.galeriaJson.content.rendered;
                                                let objImg = this._galServ.extraerImagen(htmlContent);
                                                this.objGaleria = this._galServ.extraerURLimagen(objImg);
                                              
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