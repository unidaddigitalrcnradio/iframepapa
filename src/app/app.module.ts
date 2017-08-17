import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NoticiaComponent } from './noticias/noticias.component';
import { GaleriaComponent } from './galerias/galeria.component';


@NgModule({
  declarations: [
    AppComponent,
    NoticiaComponent,
    GaleriaComponent
    ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
