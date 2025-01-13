import { CanActivateFn, Router } from '@angular/router';
import { Observable, tap } from "rxjs";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

const privateCheckAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuth().pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
      }
    }),
  );
};

export const canActivateGuard: CanActivateFn = (route, state) => {
  return privateCheckAuthStatus();
};

export const canMatchGuard: CanActivateFn = (route, state) => {
  return privateCheckAuthStatus();
};
