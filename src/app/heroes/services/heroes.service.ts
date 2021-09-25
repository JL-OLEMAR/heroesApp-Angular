import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { environment } from '../../../environments/environment'
import { Heroe } from '../interfaces/heroes.interface'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private readonly baseUrl: string = environment.baseUrl

  constructor (private readonly http: HttpClient) { }

  getHeores (): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`)
  }

  getHeoreById (id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
  }

  getSugerencias (termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`)
  }
}
