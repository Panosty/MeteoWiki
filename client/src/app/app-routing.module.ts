import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { CondtionsActuellesComponent } from './condtions-actuelles/condtions-actuelles.component';
import { ProchainesHeuresComponent } from './prochaines-heures/prochaines-heures.component';

const routes: Routes = [
  //On redirige / vers /weather
  {path:'',pathMatch:'full', redirectTo:'weather'},

  //canActivate: [AuthGuard] permet de bloquer 
  //une route si l'utilisateur n'est pas login
  //TODO vous pouvez retirer temporairement le guard pour développer
  {path:'weather', component: CondtionsActuellesComponent , canActivate: [AuthGuard]}, 

  //Route pour la page d'authentification
  {path:'auth', component: AuthComponent },


  //TODO Ajouter les autres routes au besoin
  {path:'hourly', component: ProchainesHeuresComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
