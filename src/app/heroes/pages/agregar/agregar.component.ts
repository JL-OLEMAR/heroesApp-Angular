import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'

import { HeroesService } from '../../services/heroes.service'
import { Heroe, Publisher } from '../../interfaces/heroes.interface'

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
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
    private router: Router
  ) { }

  ngOnInit (): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => (this.heroesService.getHeoreById(id))))
      .subscribe(heroe => (this.heroe = heroe))
  }

  guardar (): void {
    if (this.heroe.superhero.trim().length === 0) return // eslint-disable-line

    if (this.heroe.id !== undefined) {
      // Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => (console.log('Actualizando', heroe)))
    } else {
      // Crear
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar', heroe.id])
        })
    }
  }
}
