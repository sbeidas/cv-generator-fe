import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocBarComponent } from '../../components/soc-bar/soc-bar.component';
const routes: Routes = [  { path: '', component: SocBarComponent }
];

/**
 * SocBar routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocBarRoutingModule { }
