import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from '../../components/map/map.component';
const routes: Routes = [  { path: '', component: MapComponent }
];

/**
 * Map routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
