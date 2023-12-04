import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const customerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if (localStorage.getItem('AdminRole') == 'customerService') {
    return true
  } else {
    router.navigate(['/']);
    return false
  }

};
