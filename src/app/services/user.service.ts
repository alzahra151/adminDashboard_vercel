import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  options = {}
  constructor(private httpClient: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': 'token ' + this.token
      }),
    }
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
    return this.httpClient.get(`${environment.apiUrl}/Admin/get-user`, this.options)
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
