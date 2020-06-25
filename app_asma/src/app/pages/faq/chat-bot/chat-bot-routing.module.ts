import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatBotPage } from './chat-bot.page';

const routes: Routes = [
  {
    path: '',
    component: ChatBotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatBotPageRoutingModule {}
