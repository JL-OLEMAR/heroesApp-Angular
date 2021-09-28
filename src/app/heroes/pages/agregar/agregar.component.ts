/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'

import { HeroesService } from '../../services/heroes.service'
import { Heroe, Publisher } from '../../interfaces/heroes.interface'

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor (
    private readonly heroesService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit (): void {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => (this.heroesService.getHeoreById(id))))
        .subscribe(heroe => (this.heroe = heroe))
    }
  }

  guardar (): void {
    if (this.heroe.superhero.trim().length === 0) return

    if (this.heroe.id) {
      // Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => (console.log('Actualizando', heroe)))
    } else {
      // Crear
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          // redirigir a page editar
          this.router.navigate(['/heroes/editar', heroe.id]) // eslint-disable-line
        })
    }
  }

  borrarHeroe (): void {
    this.heroesService.borrarHeroe(this.heroe.id!)
      .subscribe(resp => {
        this.router.navigate(['/heroes'])
      })
  }
}
