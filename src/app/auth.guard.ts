import { CanActivateFn, Router } from '@angular/router';
import { CarsService } from './cars.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(CarsService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/']);
    console.log("access denied");

    return false;
  }
};
