import { Component, OnInit } from '@angular/core'
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

  constructor (private readonly heroesService: HeroesService) { }

  ngOnInit (): void {
  }

  guardar (): void {
    if (this.heroe.superhero.trim().length === 0) return // eslint-disable-line

    this.heroesService.agregarHeroe(this.heroe)
      .subscribe(resp => {
        console.log('Respuesta:', resp)
      })
  }
}
