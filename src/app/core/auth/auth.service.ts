import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  authenticate(userName: string, password: string) {

    return this.http
      .post(
        API_URL + '/user/login', 
        { userName, password }, 
        { observe: 'response'} 
      )
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        this.userService.setToken(authToken);
        console.log(`User ${userName} authenticated with token ${authToken}`);
      }));
  }


  testeCertificado(userName: string, password: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        
        'Access-Control-Allow-Origin': "*"
      })
    };
    return this.http
      .get(
        'https://api-hml.telefonica.com.br/status/healthcheck',httpOptions
    
      ).subscribe(
              data => console.log("dados"+data),
             err => console.error(err),
              () => console.log('done loading foods')
            );
   /*   .pipe(  tap( // Log the result or error
        data => console.log(data),
        error => console.log("error")
      ));*/
  }
}