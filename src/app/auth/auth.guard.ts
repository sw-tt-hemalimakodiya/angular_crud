import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot) => {
	//alert("you don't have permission");
	return false;
};
