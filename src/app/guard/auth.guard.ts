import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { AlertService } from '../components/alert/alert.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const alertService = inject(AlertService);
  const router = inject(Router);
  const isAuthenticated: boolean = authService.IsAuthenticated();
  //const isAuthenticated: boolean = false;
  console.log('Inside auth guard');
  if (!isAuthenticated) {
    alertService.error('Please login first', { autoClose: true, keepAfterRouteChange: true })
    authService.logout();
    router.navigate(['/login']);
    return false;
  }
  return true;
  
};

export const notAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated: boolean = authService.IsAuthenticated();
  //const isAuthenticated: boolean = false;
  if (isAuthenticated) {
    router.navigate(['admin']);
    return false;
  }
  return true;
};