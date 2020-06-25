import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaqPage } from './faq.page';

const routes: Routes = [
  {
    path: '',
    component: FaqPage
  },
  {
    path: 'chat-bot',
    loadChildren: () => import('./chat-bot/chat-bot.module').then( m => m.ChatBotPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqPageRoutingModule {}
