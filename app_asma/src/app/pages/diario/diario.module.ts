import { CalendarioComponent } from './calendario/calendario.component';
import { CalendarModule } from 'ion2-calendar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiarioPageRoutingModule } from './diario-routing.module';

import { DiarioPage } from './diario.page';

@NgModule({
  entryComponents: [CalendarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiarioPageRoutingModule,
    CalendarModule
  ],
  declarations: [DiarioPage, CalendarioComponent]
  
})
export class DiarioPageModule {}
