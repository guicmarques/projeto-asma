import { WeekProgressCanvasComponent } from './week-progress-canvas/week-progress-canvas.component';
import { StepsCanvasComponent } from './steps-canvas/steps-canvas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { D3BarComponent } from './d3-bar/d3-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, StepsCanvasComponent, WeekProgressCanvasComponent, D3BarComponent]
})
export class HomePageModule {}
