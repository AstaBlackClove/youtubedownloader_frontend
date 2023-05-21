import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // baseUrl = 'https://youtubedownloadapp.onrender.com'
  baseUrl = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

  getVideoDetailByUrl(data:any){
    return this.http.post(`${this.baseUrl}/download`,data)
  }

}
