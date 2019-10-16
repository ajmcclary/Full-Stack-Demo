import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, CoreModule } from '@demo/core';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'auth',
    loadChildren: () => import('@demo/auth').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@demo/dashboard').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
