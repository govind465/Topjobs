import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';


import { JobsComponent } from './jobs/jobs.component';
import { SeekerComponent } from './seeker.component';




const routes: Routes = [
 {
    path: 'seeker', component : SeekerComponent, children: [
      {
    path : 'resume', component : ResumeComponent
      },
      {
    path : 'jobs', component: JobsComponent
      }

]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SeekerRoutingModule {}
