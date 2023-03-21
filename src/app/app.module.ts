import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent, SafePipe} from './app.component';
import { WalkComponent } from './walk/walk.component';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    WalkComponent,
    HomeComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
