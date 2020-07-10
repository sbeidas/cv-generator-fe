import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectCardComponent } from '../../components/project-card/project-card.component';
const routes: Routes = [  { path: '', component: ProjectCardComponent }
];

/**
 * ProjectCard routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectCardRoutingModule { }
