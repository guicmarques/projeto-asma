import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //
  //{path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule'},
  {
    path: '', 
    redirectTo: 'splash-screen', 
    pathMatch: 'full'
  },
  {path: '', loadChildren: './pages/login/login.module#LoginPageModule'},
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tabs/diario/questionario',
    loadChildren: () => import('./pages/diario/questionario/questionario.module').then( m => m.QuestionarioPageModule)
  },
  {
    path: 'tabs/diario/barreiras',
    loadChildren: () => import('./pages/diario/barreiras/barreiras.module').then( m => m.BarreirasPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./pages/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    pathMatch: 'full'
  },
  {path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
