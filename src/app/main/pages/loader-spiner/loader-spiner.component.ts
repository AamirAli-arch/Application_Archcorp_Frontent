import { Component, OnInit } from '@angular/core';
import { LoaderSpinerService } from './loader-spiner.service';

@Component({
  selector: 'app-loader-spiner',
  templateUrl: './loader-spiner.component.html',
  styleUrls: ['./loader-spiner.component.scss'],
})
export class LoaderSpinerComponent implements OnInit {
  isLoadingResults;
  constructor( private _loaderService:LoaderSpinerService) {
   }

  ngOnInit(): void {
    this._loaderService.isLoading.subscribe((response:any) =>{
        this.isLoadingResults=response;
    })
  }

}
