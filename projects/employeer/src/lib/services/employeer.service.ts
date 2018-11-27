import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resume } from '../models/resume';

@Injectable({
  providedIn: 'root'
})
export class EmployeerService {

  
  private userUrl = 'http://localhost:8765/job-application';

  constructor(private http:HttpClient) { }

    getResumeListForJob(empId:String,jobId:String){
      return this.http.get<Resume[]>(this.userUrl+"/employer/seejobs/getresume/"+jobId);
    }
}
