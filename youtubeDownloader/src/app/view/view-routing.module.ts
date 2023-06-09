import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DownloadPageComponent } from "./download-page/download-page.component";

const routes: Routes= [
    {
        path:'download_page',
        component:DownloadPageComponent,
    },
    {
        path: '',
        redirectTo: 'download_page',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class ViewRoutingComponent{}

