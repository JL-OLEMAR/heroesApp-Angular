/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../../auth/services/auth.service'
import { Auth } from '../../../auth/interfaces/auth.interfaces'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 10px;
    }
  `]
})
export class HomeComponent {
  get auth (): Auth {
    return this.authService.auth
  }

  constructor (
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  logout (): void {
    this.router.navigate(['./auth'])
  }
}
