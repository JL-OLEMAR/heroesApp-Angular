/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-floating-promises */
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  constructor (
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  login (): void {
    // Ir al backend
    this.authService.login()
      .subscribe(resp => {
        if (resp.id) {
          this.router.navigate(['./heroes'])
        }
      })
  }
}
