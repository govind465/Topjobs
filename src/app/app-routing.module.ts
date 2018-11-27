import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EloginComponent } from 'projects/elogin/src/public_api';
import { EmployeerComponent } from 'projects/employeer/src/public_api';
import { LoginComponent } from 'projects/elogin/src/lib/login/login.component';
import { SignupComponent } from 'projects/elogin/src/lib/signup/signup.component';
import { NewJobComponent } from 'projects/employeer/src/lib/new-job/new-job.component';
import { PostedJobsComponent } from 'projects/employeer/src/lib/posted-jobs/posted-jobs.component';
import { ShortlistedCandidatesComponent } from 'projects/employeer/src/lib/shortlisted-candidates/shortlisted-candidates.component';
import { SeekerComponent } from 'projects/seeker/src/public_api';
import { ResumeComponent } from 'projects/seeker/src/lib/resume/resume.component';
import { JobsComponent } from 'projects/seeker/src/lib/jobs/jobs.component';
import { SloginComponent } from 'projects/slogin/src/public_api';
import { LoginComponentSeeker } from 'projects/slogin/src/lib/login/login.component';
import { SignupComponentSeeker } from 'projects/slogin/src/lib/signup/signup.component';

const routes: Routes = [



  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'blog', component: BlogsComponent
  },
  {
    path: 'about', component: AboutusComponent
  },

  {
    path: 'contact', component: ContactusComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },

  {
    path: 'home/elogin', component: EloginComponent, children: [
      { path: 'login', component: SignupComponent },
      { path: 'signup', component: LoginComponent },
      { path: '**', component: SignupComponent }
    ]
  },
  {
    path: 'employer', component: EmployeerComponent, children: [
      { path: 'newjob', component: NewJobComponent },
      { path: 'jobs', component: PostedJobsComponent },
      { path: 'shortlist', component: ShortlistedCandidatesComponent },
     
      { path: '**', component: PostedJobsComponent }
    ]
  },
  {
    path: 'seeker', component: SeekerComponent, children: [
      { path: 'resume', component: ResumeComponent },
      { path: 'jobs', component: JobsComponent },
      { path: '**', component: JobsComponent }
    ]
  },
  {
    path: 'home/slogin', component: SloginComponent, children: [
      { path: 'login', component: LoginComponentSeeker },
      { path: 'signup', component: SignupComponentSeeker },
      { path: '**', component: LoginComponentSeeker }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
