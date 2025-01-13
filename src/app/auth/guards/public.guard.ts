import { CanActivateFn, Router } from '@angular/router';
import {map, tap} from "rxjs";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

const privateCheckAuthStatus = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuth().pipe(
    tap(isAuthenticated => {
      if (isAuthenticated) {
        router.navigate(['/']);
      }
    }),
    map(isAuthenticated => !isAuthenticated)
  );
};

export const publicActivateGuard: CanActivateFn = (route, state) => {
  return privateCheckAuthStatus();
};
