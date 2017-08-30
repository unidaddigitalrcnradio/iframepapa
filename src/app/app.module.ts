import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NoticiaComponent } from './noticias/noticias.component';
import { NoticiaNewComponent } from './noticiasnew/noticiasnew.component';
import { SwiperModule } from 'angular2-useful-swiper';


@NgModule({
  declarations: [
    AppComponent,
    NoticiaComponent,
    NoticiaNewComponent
    ],
  imports: [
    BrowserModule,
    HttpModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
