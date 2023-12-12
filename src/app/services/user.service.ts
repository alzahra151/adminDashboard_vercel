import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  imageSubject = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient) {
    this.imageSubject.next(localStorage.getItem('Image'));
  }

  get token() {
    return localStorage.getItem('AdminToken')
  }
  Login(body: any) {
    return this.httpClient.post(`${environment.apiUrl}/Admin/Login`, body)
  }
  Register(body: any) {
    return this.httpClient.post(`${environment.apiUrl}/Admin`, body)
  }
  getUser() {
    return this.httpClient.get(`${environment.apiUrl}/Admin/get-user`, {
      headers: new HttpHeaders({
        'encType': "multipart/form-data",
        'token': 'token ' + this.token
      }),
    })
  }
  updateUser(data: any) {
    return this.httpClient.patch(`${environment.apiUrl}/Admin/update-user`, data, {
      headers: new HttpHeaders({
        'encType': "multipart/form-data",
        'token': 'token ' + this.token
      }),
    })
  }
}
