import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarreirasPageRoutingModule } from './barreiras-routing.module';

import { BarreirasPage } from './barreiras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarreirasPageRoutingModule
  ],
  declarations: [BarreirasPage]
})
export class BarreirasPageModule {}
