import { Injectable, OnInit } from '@angular/core';
import { Roles } from '../models/Roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: Roles = Roles.secretarial;
  constructor() { }
  getUserRole(): Roles {
    const token = localStorage.getItem('AdminToken') || ''
    const userData = JSON.parse(atob(token.split('.')[1]))
    console.log(userData)
    this.userRole = userData.Role
    return this.userRole
  }


}
