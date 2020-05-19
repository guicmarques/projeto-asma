import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeProfilePageRoutingModule } from './change-profile-routing.module';

import { ChangeProfilePage } from './change-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeProfilePageRoutingModule
  ],
  declarations: [ChangeProfilePage]
})
export class ChangeProfilePageModule {}
