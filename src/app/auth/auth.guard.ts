import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot) => {
	const authService = inject(AuthService);
	const router = inject(Router);
	const isAuthenticated: boolean = authService.IsAuthenticated();
	//const isAuthenticated: boolean = false;

	if (!isAuthenticated) {
		alert("Plz login first")
		router.navigate(['/login'])
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
		router.navigate(['/']);
	}
	return true;
};
