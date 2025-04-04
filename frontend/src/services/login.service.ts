import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private apiUrl: string;
  private corsHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3000';
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl + '/login', credentials);
  }

}
