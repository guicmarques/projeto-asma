import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExercicioDetalhesPage } from './exercicio-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: ExercicioDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercicioDetalhesPageRoutingModule {}
