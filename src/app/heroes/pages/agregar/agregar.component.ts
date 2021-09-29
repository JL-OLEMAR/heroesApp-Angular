/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-floating-promises */
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'

import { HeroesService } from '../../services/heroes.service'
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component'
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
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    public dialog: MatDialog
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
        .subscribe(heroe => (this.mostrarSnackBar('Registro actualizado')))
    } else {
      // Crear
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          // redirigir a page editar
          this.router.navigate(['/heroes/editar', heroe.id])
          this.mostrarSnackBar('Registro creado')
        })
    }
  }

  borrarHeroe (): void {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })

    dialog.afterClosed().subscribe(result => {
      if (result) {
        if (this.heroe.id) {
          this.heroesService.borrarHeroe(this.heroe.id)
            .subscribe(resp => {
              this.router.navigate(['/heroes'])
            })
        }
      }
    })
  }

  mostrarSnackBar (mensaje: string): void {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }
}
