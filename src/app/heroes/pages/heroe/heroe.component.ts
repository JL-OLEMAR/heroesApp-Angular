import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'

import { HeroesService } from '../../services/heroes.service'
import { Heroe } from '../../interfaces/heroes.interface'

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe

  constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly heroesService: HeroesService,
    private readonly router: Router
  ) { }

  ngOnInit (): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeoreById(id))
      )
      .subscribe(heroe => (this.heroe = heroe))
  }

  regresar (): void {
    this.router.navigate(['/heroes/listado'])
  }
}
