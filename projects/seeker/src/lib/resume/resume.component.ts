import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, fromEvent, BehaviorSubject, merge } from 'rxjs';
import { MatAutocomplete, MatDialog, MatPaginator, MatSort, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { AddComponent } from '../dialog/add/add.component';
import { EditComponent } from '../dialog/edit/edit.component';
import { DeleteComponent } from '../dialog/delete/delete.component';
import { DataSource } from '@angular/cdk/table';
import { SeekerService } from '../seeker.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { Issue } from '../models/Issue';

@Component({
  selector: 'sek-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
// Stepper control
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
thirdFormGroup: FormGroup;
isOptional = false;


// basic detail form

userDetailsForm = this._formBuilder.group({
  firstname: ['', [Validators.required, Validators.pattern('^([a-z]|[A-Z]){4,8}$')] ],
  birthday: ['', Validators.required],
  gender: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [  Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]
});

// Crud table
displayedColumns = ['id', 'title', 'state', 'url', 'created_at', 'updated_at', 'actions'];
exampleDatabase: SeekerService| null;
dataSource: ExampleDataSource | null;
index: number;
id: number;

// Chip control

visible = true;
selectable = true;
removable = true;
addOnBlur = true;
separatorKeysCodes: number[] = [ENTER, COMMA];
skillCtrl = new FormControl();
filteredSkills: Observable<string[]>;
skills: string[] = ['Lemon'];
allSkills: string[] = ['A', 'B', 'C', 'D', 'E'];

// experience

allItems = [
  { 'itemName':'xyz', 'itemImageUrl': "abc", 'itemPrice':'12$'},
  { 'itemName':'12', 'itemImageUrl':'abc', 'itemPrice':'12$'},
  { 'itemName': "z", 'itemImageUrl':'abc', 'itemPrice':'12$'},
 ];



@ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
@ViewChild('auto') matAutocomplete: MatAutocomplete;


constructor(private _formBuilder: FormBuilder , public httpClient: HttpClient,
  public dialog: MatDialog,
  public dataService: SeekerService) {


    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



ngOnInit() {


  this.loadData();

  this.firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  });
  this.secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });

  this.thirdFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });
}

// Chip event + Auto complete
add(event: MatChipInputEvent): void {
  // Add fruit only when MatAutocomplete is not open
  // To make sure this does not conflict with OptionSelected Event
  if (!this.matAutocomplete.isOpen) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.skillCtrl.setValue(null);
  }
}

remove(skill: string): void {
  const index = this.skills.indexOf(skill);

  if (index >= 0) {
    this.skills.splice(index, 1);
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.skills.push(event.option.viewValue);
  this.fruitInput.nativeElement.value = '';
  this.skillCtrl.setValue(null);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allSkills.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
}

////////// Crud table

refresh() {
  this.loadData();
}

addNew(issue: Issue) {
  const dialogRef = this.dialog.open(AddComponent, {
    data: {issue: issue }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      // After dialog is closed we're doing frontend updates
      // For add we're just pushing a new row inside DataService
      this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
      this.refreshTable();
    }
  });
}
startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
  this.id = id;
  // index row is used just for debugging proposes and can be removed
  this.index = i;
  console.log(this.index);
  const dialogRef = this.dialog.open(EditComponent, {
    data: {id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      // When using an edit things are little different, firstly we find record inside DataService by id
      const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
      // Then you update that record using data from dialogData (values you enetered)
      this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
      // And lastly refresh table
      this.refreshTable();
    }
  });
}

deleteItem(i: number, id: number, title: string, state: string, url: string) {
  this.index = i;
  this.id = id;
  const dialogRef = this.dialog.open(DeleteComponent, {
    data: {id: id, title: title, state: state, url: url}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
      // for delete we use splice in order to remove single object from DataService
      this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
      this.refreshTable();
    }
  });
}


private refreshTable() {
  // Refreshing table using paginator
  // Thanks yeager-j for tips
  // https://github.com/marinantonio/angular-mat-table-crud/issues/12
  this.paginator._changePageSize(this.paginator.pageSize);
}


public loadData() {
  this.exampleDatabase = new SeekerService(this.httpClient);
  this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
  fromEvent(this.filter.nativeElement, 'keyup')
    // .debounceTime(150)
    // .distinctUntilChanged()
    .subscribe(() => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
}
}

export class ExampleDataSource extends DataSource<Issue> {
_filterChange = new BehaviorSubject('');

get filter(): string {
  return this._filterChange.value;
}

set filter(filter: string) {
  this._filterChange.next(filter);
}

filteredData: Issue[] = [];
renderedData: Issue[] = [];

constructor(public _exampleDatabase: SeekerService,
            public _paginator: MatPaginator,
            public _sort: MatSort) {
  super();
  // Reset to the first page when the user changes the filter.
  this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
}

/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<Issue[]> {
  // Listen for any changes in the base data, sorting, filtering, or pagination
  const displayDataChanges = [
    this._exampleDatabase.dataChange,
    this._sort.sortChange,
    this._filterChange,
    this._paginator.page
  ];

  this._exampleDatabase.getAllIssues();


  return merge(...displayDataChanges).pipe(map( () => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
        const searchStr = (issue.id + issue.title + issue.url + issue.created_at).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
  ));
}

disconnect() {}


/** Returns a sorted copy of the database data. */
sortData(data: Issue[]): Issue[] {
  if (!this._sort.active || this._sort.direction === '') {
    return data;
  }

  return data.sort((a, b) => {
    let propertyA: number | string = '';
    let propertyB: number | string = '';

    switch (this._sort.active) {
      case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
      case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
      case 'state': [propertyA, propertyB] = [a.state, b.state]; break;
      case 'url': [propertyA, propertyB] = [a.url, b.url]; break;
      case 'created_at': [propertyA, propertyB] = [a.created_at, b.created_at]; break;
      case 'updated_at': [propertyA, propertyB] = [a.updated_at, b.updated_at]; break;
    }

    const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

    return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
  });
}



}
