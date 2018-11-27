import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EmployeerComponent } from './employeer.component';


import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentComponent } from './layout/content/content.component';
import { NewJobComponent } from './new-job/new-job.component';
import { PostedJobsComponent } from './posted-jobs/posted-jobs.component';
import { ShortlistedCandidatesComponent } from './shortlisted-candidates/shortlisted-candidates.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { EmployerRoutingModule } from './employeer-routing.module';
import { CandidateListComponent } from './candidate-list/candidate-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule, MatTableModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [EmployeerComponent, HeaderComponent,
    FooterComponent, ContentComponent, NewJobComponent, PostedJobsComponent,
    ShortlistedCandidatesComponent,
    CandidateListComponent],
  imports: [
    CommonModule,
    BrowserModule,
    EmployerRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTableModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDialogModule  
  ],
  exports: [EmployeerComponent]
  
})
export class EmployeerModule { }
