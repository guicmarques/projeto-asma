import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExerciciosPage } from './exercicios.page';

const routes: Routes = [
  {
    path: '',
    component: ExerciciosPage
  },
  {
    path: ':exerciseId',
    loadChildren: () => import('./exercicio-detalhes/exercicio-detalhes.module').then( m => m.ExercicioDetalhesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciciosPageRoutingModule {}
