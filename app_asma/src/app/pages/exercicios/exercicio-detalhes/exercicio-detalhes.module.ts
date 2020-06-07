import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExercicioDetalhesPageRoutingModule } from './exercicio-detalhes-routing.module';

import { ExercicioDetalhesPage } from './exercicio-detalhes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExercicioDetalhesPageRoutingModule
  ],
  declarations: [ExercicioDetalhesPage]
})
export class ExercicioDetalhesPageModule {}
