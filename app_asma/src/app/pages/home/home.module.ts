import { WeekProgressCanvasComponent } from './week-progress-canvas/week-progress-canvas.component';
import { StepsCanvasComponent } from './steps-canvas/steps-canvas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, StepsCanvasComponent, WeekProgressCanvasComponent]
})
export class HomePageModule {}
