import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path:'', component : HomeComponent
  },
{
  path:'inventory', component : InventoryComponent
}, 

{
  path:'contact', component : ContactComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
