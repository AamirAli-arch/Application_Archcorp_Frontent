import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { fuseAnimations } from '@fuse/animations';
import { CurrentResourcesService } from './current-resources.service';
import { Resources } from './resources';
// import { GetCurrentResources } from './resources';



@Component({
  selector: 'app-projects-current-resources',
  templateUrl: './projects-current-resources.component.html',
  styleUrls: ['./projects-current-resources.component.scss'],
  providers: [CurrentResourcesService],
  animations: fuseAnimations
})
export class ProjectsCurrentResourcesComponent implements OnInit {  

  resourceDataSource:Resources[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor( private _currentResourcesService: CurrentResourcesService){ }
  
  ngOnInit(): void {
     this.getProjectsResourceList();        
  }


  getProjectsResourceList(){   
    this._currentResourcesService.getProjectsCurrentResources().subscribe(resourceResponse =>{      
      this.resourceDataSource = resourceResponse.projectResources;    
    });
    
  }
  
}
