import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoaderSpinerService } from "../loader-spiner/loader-spiner.service";


@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss'],
  animations: fuseAnimations
})
export class MyDashboardComponent implements OnInit {
  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  constructor(
    
    private _httpClient: HttpClient,
    private _loaderService: LoaderSpinerService,
    private _fuseConfigService: FuseConfigService,
    
    
    
  ) { }

  ngOnInit(): void {
    
  }



}
