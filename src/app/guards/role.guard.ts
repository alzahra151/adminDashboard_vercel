import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Roles } from '../models/Roles.enum';

export const roleGuard: CanActivateFn = (route, state) => {
  console.log(inject(AuthService).getUserRole())
  // const Role = inject(AuthService).getUserRole()
  // const roles:Roles = 
  let id = route.params['id']
  if (inject(AuthService).getUserRole() != "Manager") {
    return true
  }
  else {
    return inject(Router).createUrlTree(['home/NewRequestes/admin-offer-details/', id])
  }
};
