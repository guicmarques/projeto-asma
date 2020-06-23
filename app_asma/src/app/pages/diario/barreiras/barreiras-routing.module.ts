import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarreirasPage } from './barreiras.page';

const routes: Routes = [
  {
    path: '',
    component: BarreirasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarreirasPageRoutingModule {}
