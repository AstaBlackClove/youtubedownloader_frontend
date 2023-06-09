import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingComponent } from "./view-routing.module";
import { DownloadPageComponent } from './download-page/download-page.component';
import { HotToastModule } from '@ngneat/hot-toast';


@NgModule({
    declarations:[
    DownloadPageComponent
  ],
    imports:[
        ViewRoutingComponent,
        FormsModule,
        CommonModule,
        HotToastModule.forRoot()
    ]
})

export class ViewModule{}