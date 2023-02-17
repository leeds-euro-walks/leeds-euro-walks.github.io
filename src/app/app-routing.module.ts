import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WalkComponent } from './walk/walk.component';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'walks/:walkNumber', component: WalkComponent },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
