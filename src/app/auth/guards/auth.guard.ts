/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-floating-promises */
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor (
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificaAutentificacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login'])
          }
        })
      )

    // if (this.authService.auth.id) {
    //   return true
    // }

    // console.log('Bloqueado por el AuthGuard · CanActivate')
    // return false
  }

  canLoad (
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.authService.verificaAutentificacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login'])
          }
        })
      )

    // if (this.authService.auth.id) {
    //   return true
    // }

    // console.log('Bloqueado por el AuthGuard · CanLoad')
    // return false
  }
}
