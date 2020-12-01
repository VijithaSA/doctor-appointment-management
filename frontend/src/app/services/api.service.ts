import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    
    baseUrl = environment.apiUrl;
    headers: HttpHeaders;
    constructor(private http:HttpClient){
    }

    public requestData(url,data){
        return this.http.post(this.baseUrl + url, data,{ headers: this.headers});
    }

    public getData(url){
        return this.http.get(this.baseUrl + url,{ headers: this.headers});
    }
    
}