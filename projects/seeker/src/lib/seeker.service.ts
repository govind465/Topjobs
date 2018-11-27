import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Issue } from './models/Issue';
import { HttpErrorResponse , HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeekerService {
  constructor(private httpClient: HttpClient) { }

  get data(): Issue[] {
    return this.dataChange.value;
  }
  private  API_URL = 'http://localhost:9990/';



  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  toasterService;






  getDialogData() {
    return this.dialogData;
  }



  getAllIssues(): void {
    this.httpClient.get<Issue[]>(this.API_URL + 'education').subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  /** CRUD METHODS

  addIssue(data: Issue): void {
    this.dialogData = data;
  }

  updateIssue(data: Issue): void {
    this.dialogData = data;
  }

  deleteIssue(id: number): void {
    console.log(id);
  }

  */


  // ADD, POST METHOD
  addIssue(kanbanItem: Issue): void {
    this.httpClient.post(this.API_URL + 'education', kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateIssue(kanbanItem: Issue): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteIssue(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

}
