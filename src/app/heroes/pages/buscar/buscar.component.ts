import { Component, OnInit } from '@angular/core'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'

import { HeroesService } from '../../services/heroes.service'
import { Heroe } from '../../interfaces/heroes.interface'

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  termino: string = ''
  heroes: Heroe[] = []
  heroeSeleccionado: Heroe | undefined

  constructor (private readonly heroesService: HeroesService) { }

  ngOnInit (): void {
  }

  buscando (): void {
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes => (this.heroes = heroes))
  }

  opcionSeleccionada (event: MatAutocompleteSelectedEvent): void {
    if (event.option.value === undefined) return

    const heroe: Heroe = event.option.value
    this.termino = heroe.superhero

    if (heroe.id !== undefined) {
      this.heroesService.getHeoreById(heroe.id)
        .subscribe(heroe => (this.heroeSeleccionado = heroe))
    } else {
      this.heroeSeleccionado = undefined
    }
  }
}
