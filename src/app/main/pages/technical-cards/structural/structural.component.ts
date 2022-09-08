import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-structural',
  templateUrl: './structural.component.html',
  styleUrls: ['./structural.component.scss']
})
export class StructuralComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  weight(thickness: number, height: number, length: number): number{
    return ((thickness*15) + 0.03*22)*height*length;
  }

  weightPerUnitLength(weight: number, length: number): number{
    return weight/length;
  }

  totalWeight(floor: number) : number{
    //get all walls on the floor
    return floor;
  }

  totalWeightOfWallsPerFloorArea(floor: number, floorArea: number): number{
    return this.totalWeight(floor)/floorArea;
  }

  mepEquipmentLoadOnRoof(equiment: string, length: number, width: number, weight: number): number{
    return weight/(100*width*length);
  }


}
