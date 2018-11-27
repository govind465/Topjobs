import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobApplication } from '../models/job-application';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  constructor(private http : HttpClient) { }

  private userUrl = 'http://localhost:8765/job-application';


  public postJobApplication(JobApplication){
    console.log("POSTING JOB");
    return this.http.post<JobApplication>(this.userUrl+"/employer/postjobs/job", JobApplication)
  }
  public getJobApplication(id:String){

    return this.http.get<JobApplication[]>(this.userUrl+"/employer/seejobs/"+id)
  }
}
