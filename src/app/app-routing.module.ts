import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from './auth/guards/auth.guard'
import { ErrorPageComponent } from './shared/error-page/error-page.component'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: async () => await import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren: async () => await import('./heroes/heroes.module').then(m => m.HeroesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '404' }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
