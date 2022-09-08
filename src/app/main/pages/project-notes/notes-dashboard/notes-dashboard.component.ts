import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { merge, Observable, of as observableOf } from 'rxjs';
import { NotesServicesService } from '../services/notes-services.service';
import { CreateNoteRequest, CreateNoteResponse, GetNoteRequest, GetNoteResponse, RiskNotes, } from '../services/riskNotes';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-notes-dashboard',
  templateUrl: './notes-dashboard.component.html',
  styleUrls: ['./notes-dashboard.component.scss']
})
export class NotesDashboardComponent implements OnInit {
  dataSource: NotesServicesService | null;
  //dataSource : GetNoteResponse[];
  filterForm: FormGroup;
  //filteredAndPaged: Observable<CreateNoteRequest[]>;


  filteredAndPaged: Observable<RiskNotes[]>;

  tableData: any[] = [];  
  groupedEmployees: any[] = [];
  isLoadingResults = true;
  resultsLength = 0;

  

  displayedColumns = [
    "projectName", "noteType", "priority", "stage", "implication", "riskProfile", "note", "createdBy", "dueDate", "employeesTo", "employeesCc"
  ];

  
  public choicesColor: Array<any> = [{ backgroundColor: ['#4d92eb'] }]
  public decisionsColor: Array<any> = [{ backgroundColor: ['#f56b41'] }]



  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };

  public radarChartLabels: Label[] = ['Design', 'Lifestyle', 'Client', 'Technical', 'Authority', 'Contractor'];

  public choicesData: ChartDataSets[] = [
    { data: [65, 59, 90, 81, 56, 55], label: 'Choices' },
  ];

  public decisionsData: ChartDataSets[] = [
    { data: [20, 22, 66, 45, 21, 50], label: 'Decisions' },
  ];

  public submittalsData: ChartDataSets[] = [
    { data: [20, 45, 23, 77, 56, 32], label: 'Submittals' },
  ];

  public radarChartType: ChartType = 'radar';

  //@ViewChild('paginator') paginator: MatPaginator;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  

  constructor(
    private _notesService: NotesServicesService,
    private _httpClient: HttpClient,
    private cdr: ChangeDetectorRef,
  ) { }




  ngOnInit(): void {
    //this.getProjectNotes();      
    //this.cdr.detectChanges();
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
     this.getProjectNotes();
      
      
    },0);
  }


  //   ngAfterViewInit() {
  //     this.dataSource = new MatTableDataSource(this.tableData);
  //     this.dataSource.paginator= this.paginator;
  // }



  // getProjectNotes() {
  //     let request = new GetNoteRequest();      
  //     this._notesService.getAllNotes(request).subscribe(response => {
  //       this.tableData = response.riskNotesDto;      
      
  //   })
  // }


  getProjectNotes() {
    this.dataSource = new NotesServicesService(this._httpClient);
    this.filteredAndPaged = merge(
      this.paginator.page
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        const request = new GetNoteRequest();
        request.currentPage = this.paginator.pageIndex + 1;
        request.pageSize = this.paginator.pageSize;
        console.log('CP',request.currentPage)  
        console.log('PS',request.pageSize)  
        
        return this._notesService.getAllNotes(request);
        
      }),
      map((data) => {
        
        this.isLoadingResults = false;
        this.resultsLength = data.totalCount;

        return data.riskNotesDto;
        
      }),
      
      catchError(() => {
        this.isLoadingResults = false;
        return observableOf([]);

      })
      
    );
  }



}




