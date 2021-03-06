import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseIndexComponent } from '../../components/course-index/course-index.component';
const routes: Routes = [  { path: '', component: CourseIndexComponent }
];

/**
 * CourseIndex routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseIndexRoutingModule { }
