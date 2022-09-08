import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { NumericDictionaryIteratee } from 'lodash';


export interface ApartmentAreas {   
  Label: string;
  Detail: ApartmentArea[];
  AreaSumSqft: number;
  AreaSumSqm: number;
  Elevation: number;
}

export interface ApartmentArea {    
  Label: string;
  AreaSqft: number;
  AreaSqm: number; 
  Percentage: number;
  Color: string;
}

//export interface Details{}
  

const apartmentAreas: ApartmentAreas[] =
[{"Label":"BASEMENT 4","AreaSumSqft":50234.6,"AreaSumSqm":4666.91,"Elevation":-50,"Detail":[{"Label":"USABLE PARKING","AreaSqm":4666.91,"AreaSqft":50235.0,"Percentage":100.0,"Color":"#7E4452"}]},{"Label":"BASEMENT 3","AreaSumSqft":50234.6,"AreaSumSqm":4666.91,"Elevation":-38,"Detail":[{"Label":"USABLE PARKING","AreaSqm":4666.91,"AreaSqft":50235.0,"Percentage":100.0,"Color":"#7E4452"}]},{"Label":"BASEMENT 2","AreaSumSqft":50234.6,"AreaSumSqm":4666.91,"Elevation":-26,"Detail":[{"Label":"USABLE PARKING","AreaSqm":4666.91,"AreaSqft":50235.0,"Percentage":100.0,"Color":"#7E4452"}]},{"Label":"BASEMENT 1","AreaSumSqft":50234.6,"AreaSumSqm":4666.91,"Elevation":-14,"Detail":[{"Label":"USABLE PARKING","AreaSqm":4666.91,"AreaSqft":50235.0,"Percentage":100.0,"Color":"#7E4452"}]},{"Label":"GROUND FLOOR","AreaSumSqft":35454.12,"AreaSumSqm":3293.77,"Elevation":1,"Detail":[{"Label":"RETAIL","AreaSqm":1283.32,"AreaSqft":13814.0,"Percentage":38.96,"Color":"#9AB57E"},{"Label":"USABLE PARKING","AreaSqm":894.08,"AreaSqft":9624.0,"Percentage":27.14,"Color":"#7E4452"},{"Label":"SERVICE","AreaSqm":639.16,"AreaSqft":6880.0,"Percentage":19.41,"Color":"#DAC599"},{"Label":"CIRCULATION","AreaSqm":443.85,"AreaSqft":4778.0,"Percentage":13.48,"Color":"#BA7862"},{"Label":"USABLE","AreaSqm":33.35,"AreaSqft":359.0,"Percentage":1.01,"Color":"#70B3A1"}]},{"Label":"PODIUM FLOOR LEVEL (OFFICE)","AreaSumSqft":25312.33,"AreaSumSqm":2351.57,"Elevation":19,"Detail":[{"Label":"USABLE","AreaSqm":1262.72,"AreaSqft":13592.0,"Percentage":53.7,"Color":"#70B3A1"},{"Label":"SERVICE","AreaSqm":803.98,"AreaSqft":8654.0,"Percentage":34.19,"Color":"#DAC599"},{"Label":"CIRCULATION","AreaSqm":273.88,"AreaSqft":2948.0,"Percentage":11.65,"Color":"#BA7862"},{"Label":"BUA","AreaSqm":10.99,"AreaSqft":118.0,"Percentage":0.47,"Color":"#90BA58"}]},{"Label":"1ST FLOOR (HEALTHCLUB)","AreaSumSqft":27644.33,"AreaSumSqm":2568.22,"Elevation":32,"Detail":[{"Label":"TERRACE","AreaSqm":840.96,"AreaSqft":9052.0,"Percentage":32.74,"Color":"#153459"},{"Label":"SHADED AREA","AreaSqm":435.14,"AreaSqft":4684.0,"Percentage":16.94,"Color":"#B1D2C6"},{"Label":"SWIMMING POOL","AreaSqm":359.91,"AreaSqft":3874.0,"Percentage":14.01,"Color":"#6682BB"},{"Label":"SERVICE","AreaSqm":282.54,"AreaSqft":3041.0,"Percentage":11.0,"Color":"#DAC599"},{"Label":"GYM","AreaSqm":270.78,"AreaSqft":2915.0,"Percentage":10.54,"Color":"#EEBA69"},{"Label":"USABLE","AreaSqm":195.31,"AreaSqft":2102.0,"Percentage":7.6,"Color":"#70B3A1"},{"Label":"CIRCULATION","AreaSqm":165.18,"AreaSqft":1778.0,"Percentage":6.43,"Color":"#BA7862"},{"Label":"BUA","AreaSqm":18.39,"AreaSqft":198.0,"Percentage":0.72,"Color":"#90BA58"}]},{"Label":"2nd TO 8th TYPICAL FLOOR PLAN","AreaSumSqft":27838.02,"AreaSumSqm":2586.21,"Elevation":45,"Detail":[{"Label":"USABLE","AreaSqm":1749.45,"AreaSqft":18831.0,"Percentage":67.64,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":557.5,"AreaSqft":6001.0,"Percentage":21.56,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":182.96,"AreaSqft":1969.0,"Percentage":7.07,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":64.74,"AreaSqft":697.0,"Percentage":2.5,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":31.57,"AreaSqft":340.0,"Percentage":1.22,"Color":"#90BA58"}]},{"Label":"3RD FLOOR LEVEL","AreaSumSqft":27842.3,"AreaSumSqm":2586.61,"Elevation":56,"Detail":[{"Label":"USABLE","AreaSqm":1749.45,"AreaSqft":18831.0,"Percentage":67.63,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":557.9,"AreaSqft":6005.0,"Percentage":21.57,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":182.96,"AreaSqft":1969.0,"Percentage":7.07,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":64.74,"AreaSqft":697.0,"Percentage":2.5,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":31.57,"AreaSqft":340.0,"Percentage":1.22,"Color":"#90BA58"}]},{"Label":"4TH FLOOR LEVEL","AreaSumSqft":25957.93,"AreaSumSqm":2411.55,"Elevation":68,"Detail":[{"Label":"USABLE","AreaSqm":1749.18,"AreaSqft":18828.0,"Percentage":72.53,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":383.1,"AreaSqft":4124.0,"Percentage":15.89,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":182.96,"AreaSqft":1969.0,"Percentage":7.59,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":64.74,"AreaSqft":697.0,"Percentage":2.69,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":31.57,"AreaSqft":340.0,"Percentage":1.31,"Color":"#90BA58"}]},{"Label":"5TH FLOOR LEVEL","AreaSumSqft":27817.34,"AreaSumSqm":2584.29,"Elevation":79,"Detail":[{"Label":"USABLE","AreaSqm":1749.44,"AreaSqft":18831.0,"Percentage":67.7,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":555.63,"AreaSqft":5981.0,"Percentage":21.5,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":182.96,"AreaSqft":1969.0,"Percentage":7.08,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":64.74,"AreaSqft":697.0,"Percentage":2.51,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":31.52,"AreaSqft":339.0,"Percentage":1.22,"Color":"#90BA58"}]},{"Label":"6TH FLOOR LEVEL","AreaSumSqft":27817.34,"AreaSumSqm":2584.29,"Elevation":91,"Detail":[{"Label":"USABLE","AreaSqm":1749.44,"AreaSqft":18831.0,"Percentage":67.7,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":555.63,"AreaSqft":5981.0,"Percentage":21.5,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":182.96,"AreaSqft":1969.0,"Percentage":7.08,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":64.74,"AreaSqft":697.0,"Percentage":2.51,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":31.52,"AreaSqft":339.0,"Percentage":1.22,"Color":"#90BA58"}]},{"Label":"7TH FLOOR LEVEL","AreaSumSqft":27817.34,"AreaSumSqm":2584.29,"Elevation":102,"Detail":[{"Label":"USABLE","AreaSqm":1749.44,"AreaSqft":18831.0,"Percentage":67.7,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":555.63,"AreaSqft":5981.0,"Percentage":21.5,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":182.96,"AreaSqft":1969.0,"Percentage":7.08,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":64.74,"AreaSqft":697.0,"Percentage":2.51,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":31.52,"AreaSqft":339.0,"Percentage":1.22,"Color":"#90BA58"}]},{"Label":"8TH FLOOR LEVEL","AreaSumSqft":27817.34,"AreaSumSqm":2584.29,"Elevation":114,"Detail":[{"Label":"USABLE","AreaSqm":1749.44,"AreaSqft":18831.0,"Percentage":67.7,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":555.63,"AreaSqft":5981.0,"Percentage":21.5,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":182.96,"AreaSqft":1969.0,"Percentage":7.08,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":64.74,"AreaSqft":697.0,"Percentage":2.51,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":31.52,"AreaSqft":339.0,"Percentage":1.22,"Color":"#90BA58"}]},{"Label":"9TH FLOOR LEVEL","AreaSumSqft":28007.15,"AreaSumSqm":2601.93,"Elevation":125,"Detail":[{"Label":"USABLE","AreaSqm":1582.23,"AreaSqft":17031.0,"Percentage":60.81,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":753.73,"AreaSqft":8113.0,"Percentage":28.97,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":170.3,"AreaSqft":1833.0,"Percentage":6.54,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.96,"AreaSqft":731.0,"Percentage":2.61,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":27.71,"AreaSqft":298.0,"Percentage":1.06,"Color":"#90BA58"}]},{"Label":"10TH FLOOR LEVEL","AreaSumSqft":24142.01,"AreaSumSqm":2242.85,"Elevation":136,"Detail":[{"Label":"USABLE","AreaSqm":1582.46,"AreaSqft":17034.0,"Percentage":70.56,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":394.42,"AreaSqft":4245.0,"Percentage":17.58,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":170.3,"AreaSqft":1833.0,"Percentage":7.59,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.96,"AreaSqft":731.0,"Percentage":3.03,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":27.72,"AreaSqft":298.0,"Percentage":1.23,"Color":"#90BA58"}]},{"Label":"11TH FLOOR LEVEL","AreaSumSqft":26636.03,"AreaSumSqm":2474.55,"Elevation":148,"Detail":[{"Label":"USABLE","AreaSqm":1582.44,"AreaSqft":17033.0,"Percentage":63.95,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":626.13,"AreaSqft":6740.0,"Percentage":25.3,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":170.3,"AreaSqft":1833.0,"Percentage":6.88,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.96,"AreaSqft":731.0,"Percentage":2.74,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":27.72,"AreaSqft":298.0,"Percentage":1.12,"Color":"#90BA58"}]},{"Label":"12TH FLOOR LEVEL","AreaSumSqft":26636.14,"AreaSumSqm":2474.56,"Elevation":159,"Detail":[{"Label":"USABLE","AreaSqm":1582.45,"AreaSqft":17034.0,"Percentage":63.95,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":626.13,"AreaSqft":6740.0,"Percentage":25.3,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":170.3,"AreaSqft":1833.0,"Percentage":6.88,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.96,"AreaSqft":731.0,"Percentage":2.74,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":27.72,"AreaSqft":298.0,"Percentage":1.12,"Color":"#90BA58"}]},{"Label":"13TH FLOOR LEVEL","AreaSumSqft":26636.14,"AreaSumSqm":2474.56,"Elevation":171,"Detail":[{"Label":"USABLE","AreaSqm":1582.45,"AreaSqft":17034.0,"Percentage":63.95,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":626.13,"AreaSqft":6740.0,"Percentage":25.3,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":170.3,"AreaSqft":1833.0,"Percentage":6.88,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.96,"AreaSqft":731.0,"Percentage":2.74,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":27.72,"AreaSqft":298.0,"Percentage":1.12,"Color":"#90BA58"}]},{"Label":"14TH FLOOR LEVEL","AreaSumSqft":26637.8,"AreaSumSqm":2474.71,"Elevation":182,"Detail":[{"Label":"USABLE","AreaSqm":1582.45,"AreaSqft":17034.0,"Percentage":63.95,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":626.29,"AreaSqft":6741.0,"Percentage":25.31,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":170.3,"AreaSqft":1833.0,"Percentage":6.88,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.96,"AreaSqft":731.0,"Percentage":2.74,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":27.72,"AreaSqft":298.0,"Percentage":1.12,"Color":"#90BA58"}]},{"Label":"15TH FLOOR LEVEL","AreaSumSqft":26602.49,"AreaSumSqm":2471.43,"Elevation":194,"Detail":[{"Label":"USABLE","AreaSqm":1582.43,"AreaSqft":17033.0,"Percentage":64.03,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":623.03,"AreaSqft":6706.0,"Percentage":25.21,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":170.3,"AreaSqft":1833.0,"Percentage":6.89,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.96,"AreaSqft":731.0,"Percentage":2.75,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":27.72,"AreaSqft":298.0,"Percentage":1.12,"Color":"#90BA58"}]},{"Label":"16TH FLOOR LEVEL","AreaSumSqft":24313.89,"AreaSumSqm":2258.82,"Elevation":205,"Detail":[{"Label":"USABLE","AreaSqm":1582.54,"AreaSqft":17035.0,"Percentage":70.06,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":410.3,"AreaSqft":4416.0,"Percentage":18.16,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":170.3,"AreaSqft":1833.0,"Percentage":7.54,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.96,"AreaSqft":731.0,"Percentage":3.01,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":27.72,"AreaSqft":298.0,"Percentage":1.23,"Color":"#90BA58"}]},{"Label":"17TH FLOOR LEVEL","AreaSumSqft":26638.08,"AreaSumSqm":2474.74,"Elevation":217,"Detail":[{"Label":"USABLE","AreaSqm":1660.3,"AreaSqft":17872.0,"Percentage":67.09,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":560.37,"AreaSqft":6032.0,"Percentage":22.64,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":162.43,"AreaSqft":1748.0,"Percentage":6.56,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.3,"AreaSqft":724.0,"Percentage":2.72,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":24.33,"AreaSqft":262.0,"Percentage":0.98,"Color":"#90BA58"}]},{"Label":"18TH FLOOR LEVEL","AreaSumSqft":26638.06,"AreaSumSqm":2474.74,"Elevation":228,"Detail":[{"Label":"USABLE","AreaSqm":1660.27,"AreaSqft":17871.0,"Percentage":67.09,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":560.41,"AreaSqft":6032.0,"Percentage":22.64,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":162.43,"AreaSqft":1748.0,"Percentage":6.56,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.3,"AreaSqft":724.0,"Percentage":2.72,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":24.33,"AreaSqft":262.0,"Percentage":0.98,"Color":"#90BA58"}]},{"Label":"19TH FLOOR LEVEL","AreaSumSqft":26638.06,"AreaSumSqm":2474.74,"Elevation":240,"Detail":[{"Label":"USABLE","AreaSqm":1660.27,"AreaSqft":17871.0,"Percentage":67.09,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":560.41,"AreaSqft":6032.0,"Percentage":22.64,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":162.43,"AreaSqft":1748.0,"Percentage":6.56,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.3,"AreaSqft":724.0,"Percentage":2.72,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":24.33,"AreaSqft":262.0,"Percentage":0.98,"Color":"#90BA58"}]},{"Label":"20TH FLOOR LEVEL","AreaSumSqft":26638.06,"AreaSumSqm":2474.74,"Elevation":251,"Detail":[{"Label":"USABLE","AreaSqm":1660.27,"AreaSqft":17871.0,"Percentage":67.09,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":560.41,"AreaSqft":6032.0,"Percentage":22.64,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":162.43,"AreaSqft":1748.0,"Percentage":6.56,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.3,"AreaSqft":724.0,"Percentage":2.72,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":24.33,"AreaSqft":262.0,"Percentage":0.98,"Color":"#90BA58"}]},{"Label":"21ST FLOOR LEVEL","AreaSumSqft":26645.58,"AreaSumSqm":2475.44,"Elevation":263,"Detail":[{"Label":"USABLE","AreaSqm":1659.62,"AreaSqft":17864.0,"Percentage":67.04,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":561.76,"AreaSqft":6047.0,"Percentage":22.69,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":162.43,"AreaSqft":1748.0,"Percentage":6.56,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":67.3,"AreaSqft":724.0,"Percentage":2.72,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":24.33,"AreaSqft":262.0,"Percentage":0.98,"Color":"#90BA58"}]},{"Label":"22ND FLOOR LEVEL","AreaSumSqft":25305.65,"AreaSumSqm":2350.95,"Elevation":274,"Detail":[{"Label":"USABLE","AreaSqm":1660.47,"AreaSqft":17873.0,"Percentage":70.63,"Color":"#70B3A1"},{"Label":"BALCONY","AreaSqm":427.54,"AreaSqft":4602.0,"Percentage":18.19,"Color":"#057D85"},{"Label":"CIRCULATION","AreaSqm":162.43,"AreaSqft":1748.0,"Percentage":6.91,"Color":"#BA7862"},{"Label":"SERVICE","AreaSqm":76.18,"AreaSqft":820.0,"Percentage":3.24,"Color":"#DAC599"},{"Label":"BUA","AreaSqm":24.33,"AreaSqft":262.0,"Percentage":1.04,"Color":"#90BA58"}]},{"Label":"ROOF FLOOR LEVEL","AreaSumSqft":455.85,"AreaSumSqm":42.35,"Elevation":286,"Detail":[{"Label":"SERVICE","AreaSqm":42.35,"AreaSqft":456.0,"Percentage":100.03,"Color":"#DAC599"}]}]

@Injectable({
  providedIn: 'root'
})
export class AccBimService {

  constructor() { }

  getApartmentAreas() {
    return apartmentAreas;
  }
}
