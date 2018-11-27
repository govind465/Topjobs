import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seeker } from './models/seeker';

@Injectable({
  providedIn: 'root'
})
export class SloginService {

  private userUrl = 'http://localhost:9090';

  constructor(private httpClient: HttpClient) { }


  public requestLogin(username, password) {

    return this.httpClient.get<boolean>(this.userUrl + '/seeker/login/emp/' + username + '/' + password);
  }
  public signUpUser(seeker) {

    return this.httpClient.post<Seeker>(this.userUrl + '/seeker/signup/emp', seeker);
  }

}
