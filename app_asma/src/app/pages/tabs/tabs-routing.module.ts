import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {path: 'home', loadChildren: "./../home/home.module#HomePageModule"},
      {path: 'perfil', loadChildren: '../perfil/perfil.module#PerfilPageModule'},
      {path: 'faq', loadChildren: '../faq/faq.module#FaqPageModule'},
      {path: 'exercicios', loadChildren: '../exercicios/exercicios.module#ExerciciosPageModule'},
      {path: 'diario', loadChildren: '../diario/diario.module#DiarioPageModule'},
    ]
  },
  {path: 'diario', redirectTo: '/tabs/diario', pathMatch: 'full'},
  {path: '', redirectTo: '/tabs/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
