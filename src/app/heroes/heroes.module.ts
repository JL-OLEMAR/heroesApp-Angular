import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'

import { HeroesRoutingModule } from './heroes-routing.module'
import { MaterialModule } from '../material/material.module'

import { ImagenPipe } from './pipes/imagen.pipe'
import { ConfirmarComponent } from './components/confirmar/confirmar.component'
import { HeroeTarjetaComponent } from './components/heroe-tarjeta/heroe-tarjeta.component'

import { ListadoComponent } from './pages/listado/listado.component'
import { AgregarComponent } from './pages/agregar/agregar.component'
import { BuscarComponent } from './pages/buscar/buscar.component'
import { HeroeComponent } from './pages/heroe/heroe.component'
import { HomeComponent } from './pages/home/home.component'

@NgModule({
  declarations: [
    ImagenPipe,
    ConfirmarComponent,
    HeroeTarjetaComponent,

    AgregarComponent,
    BuscarComponent,
    HeroeComponent,
    HomeComponent,
    ListadoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    HeroesRoutingModule,
    MaterialModule
  ]
})
export class HeroesModule { }
