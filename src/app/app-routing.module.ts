import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TicketListComponent } from './pages/tickets/ticket-list/ticket-list.component';
import { TicketViewComponent } from './pages/tickets/ticket-view/ticket-view.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

const routes: Routes = [
  {
    path:'',component:PagesComponent, children: [
      { path:'',component:HomeComponent},
      { path:'login',component:LoginComponent},
      { path:'profile',component:ProfileComponent},
      { path:'tickets',component:TicketsComponent ,children:[
        {path:'',component:TicketListComponent},
        {path:'tickets/:id/view',component:TicketViewComponent}
      ]},
      { path:'about-us',component:AboutUsComponent},
    ]
  },
  {path:'not-found',component:NotFoundComponent},
  {path:'**', redirectTo:'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
