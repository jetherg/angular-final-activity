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
import { TwoColumnComponent } from './two-column/two-column.component';
import { OneColumnComponent } from './one-column/one-column.component';

const routes: Routes = [
  {
    path:'',component:TwoColumnComponent, children: [
      { path:'',component:HomeComponent},
      { path:'profile',component:ProfileComponent},
      { path:'tickets',component:TicketsComponent ,children:[
        {path:'',component:TicketListComponent},
        {path:'tickets/:id/view',component:TicketViewComponent},
        {path:'**', redirectTo:'not-found'}
      ]},
    ]
  },
  {
    path:'login',component:OneColumnComponent, children: [
      { path:'',component:LoginComponent},
      {path:'**', redirectTo:'not-found'}
    ]
  },
  {
    path:'about-us',component:OneColumnComponent, children: [
      { path:'',component:AboutUsComponent},
      {path:'**', redirectTo:'not-found'}
    ]
  },
  {path:'not-found',component:OneColumnComponent,children:[
    {path:'',component:NotFoundComponent}
  ]},
  {path:'**', redirectTo:'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
