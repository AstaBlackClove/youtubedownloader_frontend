import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.scss']
})
export class DownloadPageComponent implements OnInit {

  url:any;
  thumbnail:any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  getVideo(){
    const finalUrl = {
      "url":this.url
    }
    this.api.getVideoDetailByUrl(finalUrl).subscribe(async(res:any) =>{

      const thumb = res.thumb
      this.thumbnail = thumb.find((obj:any) =>{
        obj.thumbanail.height === 1080 && obj.thumbanail.width >= 1920 && obj.thumbanail.width < 1930
        return obj.thumbanail.url
      })
      if(this.thumbnail){
        this.thumbnail = this.thumbnail.thumbanail.url
      }else{
        console.log('No Thumbnail Found')
      }

      const downloadLinks = res.downloadLinks.filter((item:any) =>{
        if(item.audio === true){
            return item
        }else{
          return false
        }
      })

      console.log(downloadLinks)
    })
  }

}
