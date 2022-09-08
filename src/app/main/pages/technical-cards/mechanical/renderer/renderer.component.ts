import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements ICellRendererAngularComp  {
  public params: any;
  public style: string;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.style = this.params.style;

    console.log("agInit Params", params)
  }

  refresh(): boolean {
    return false;
  }
}
