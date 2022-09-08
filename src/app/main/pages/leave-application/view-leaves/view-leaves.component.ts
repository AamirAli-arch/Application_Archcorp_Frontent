import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { merge, Observable, of as observableOf } from "rxjs";
import { LoaderSpinerService } from '../../loader-spiner/loader-spiner.service';
import { LeaveService } from '../services/leave.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-view-leaves',
  templateUrl: './view-leaves.component.html',
  styleUrls: ['./view-leaves.component.scss']
})
export class ViewLeavesComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    "empName",
    "balance",
    "used",
  ];
  dataSource: LeaveService | null;
  filterForm: FormGroup;
  filteredAndPaged: Observable<any[]>;
  isLoadingResults = true;
  getId: any = 0;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder,
    private _httpClient: HttpClient,
    private _loaderService: LoaderSpinerService,
    private _leaveService: LeaveService) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: new FormControl([]),
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getLeaveBalanceDetails();
    });
  }

  getLeaveBalanceDetails() {
    this.dataSource = new LeaveService(this._httpClient);
    this.filteredAndPaged = merge(
      this.paginator.page,
    ).pipe(
      startWith({}),
      switchMap(() => {
        console.log("switch")
        this.isLoadingResults = true;
        this._loaderService.show();
        return this._leaveService.getLeaveBalanceDetails(this.getId);
      }),
      map((data) => {
        this._loaderService.hide();
        console.log(data)
        this.resultsLength = data.totalCount;
        return data;
      }),
      catchError(() => {
        this._loaderService.hide();
        return observableOf([]);
      })
    );

  }

  getEmployeValue(data: any) {
    this.getId = data;
    this.getLeaveBalanceDetails();
  }

}
