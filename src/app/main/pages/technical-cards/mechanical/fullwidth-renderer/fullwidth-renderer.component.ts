import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-fullwidth-renderer',
  templateUrl: './fullwidth-renderer.component.html',
  styleUrls: ['./fullwidth-renderer.component.scss']
})
export class FullwidthRendererComponent implements AgRendererComponent {
  private params: any;
  public values: string;
  private data: any;
  
  constructor() { }
  refresh(params: ICellRendererParams): boolean {
    return true;
  }
 
  agInit(params: any): void {
    this.params = params;
    this.data = params.node.data;
  }

}
