import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Resume } from '../models/Resume';
import { ResumeService } from '../services/resume.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'emp-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  @Input('init')
  jobId:string;
  displayedColumns: string[] = ['resumeId', 'name', 'email', 'contact', 'dob', 'details'];
  ELEMENT_DATA:Resume[];
  //dataSource = new MatTableDataSource<Resume>(this.ELEMENT_DATA);
  dataSource:Resume[];
  selection = new SelectionModel<Resume>(true, []);
  empId:String;

  constructor(private resumeService:ResumeService,private route:ActivatedRoute,private dialog:MatDialog){

  }
  ngOnInit(){
    this.empId=this.route.snapshot.paramMap.get("empId");
    console.log(this.jobId);
    this.getResumeListForJob(this.jobId);
  }
  getResumeListForJob(jobId:String){

    this.resumeService.getResumeListForJob(this.empId,jobId).subscribe(data=>{
      console.log(data);
      this.ELEMENT_DATA=data;
      this.dataSource=data;
    });
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }
  openDialog() {
    const dialogRef = this.dialog.open(ResumeContentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}



@Component({
  selector: 'resume-content-dialog',
  templateUrl: 'resume-dialog.html',
})
export class ResumeContentDialog {}