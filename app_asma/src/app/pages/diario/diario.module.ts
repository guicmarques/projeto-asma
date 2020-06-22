import { CalendarioComponent } from './calendario/calendario.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiarioPageRoutingModule } from './diario-routing.module';

import { DiarioPage } from './diario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiarioPageRoutingModule
  ],
  declarations: [DiarioPage, SaveButtonComponent, CalendarioComponent]
  
})
export class DiarioPageModule {}
