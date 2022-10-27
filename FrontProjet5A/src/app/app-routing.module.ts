import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnteteComponent } from './entete/entete.component';
import { NavComponent} from './nav/nav.component';
const routes: Routes = [
  {path : "connexion", component : ConnexionComponent},
  {path : "inscription", component : InscriptionComponent} ,
  {path : "dashboard", component : DashboardComponent},
  {path : "entete", component : EnteteComponent},
  {path : "nav", component : NavComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
