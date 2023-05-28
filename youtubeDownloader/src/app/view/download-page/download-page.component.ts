import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.scss']
})
export class DownloadPageComponent implements OnInit {

  url:any;
  thumbnail:any;
  loading:boolean = false;
  title:any;
  resolution:any;
  downloadVideo:any;
  tableData:any;
  finalValue:any;
  content:boolean = false;

  constructor(private api: ApiService,private toast: HotToastService) { }

  ngOnInit(): void {
  }

  onEnterkeyPress(event: Event){
    const keyboardevent = event as KeyboardEvent
    if(keyboardevent.key === 'Enter'){
      this.getVideo();
    }
  }

  getVideo(){
    this.loading = true;
    const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
    if(youtubeUrlPattern.test(this.url)){
      const finalUrl = {
        "url":this.url
      }
      this.api.getVideoDetailByUrl(finalUrl).subscribe(async(res:any) =>{
        if(res.code === 200){
          const thumb = res.thumb
  
          this.thumbnail = thumb.find((obj:any) =>{
            obj.thumbanail.height === 1080 && obj.thumbanail.width >= 1920 && obj.thumbanail.width < 1930
            return obj.thumbanail.url
          })
    
          if(this.thumbnail){
            this.thumbnail = this.thumbnail.thumbanail.url
          }else{
            this.toast.info('No Thumbnail Was Found..')
          }
    
          const downloadLinks = res.downloadLinks.filter((item:any) =>{
            if(item.audio === true){
                return item
            }else{
              return false
            }
          })
    
          this.title = res.downloadLinks[0].title
          
          this.tableData = []
          this.resolution = downloadLinks.map((items:any) =>{
            this.content = true;
            this.tableData.push({
              resolution:items.resolution,
              downloadLink:items.downloadLink
            })
          })
          this.loading = false;
        }else if(res.code === 500){
          this.toast.warning('Sorry The Server is Not Responding...')
        }
      })
    }else{
      this.toast.info('Please Provide a Valid URL...')
      this.loading = false;
    }
  }

  downloadVideoLink(link:any){
    window.open(link)
  }

}
