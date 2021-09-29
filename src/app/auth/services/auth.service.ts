/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { environment } from '../../../environments/environment'
import { Auth } from '../interfaces/auth.interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl
  private _auth: Auth | undefined

  get auth (): Auth {
    return { ...this._auth! }
  }

  constructor (private readonly http: HttpClient) { }

  login (): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(auth => (this._auth = auth))
      )
  }

  logout (): void {
    this._auth = undefined
  }
}
