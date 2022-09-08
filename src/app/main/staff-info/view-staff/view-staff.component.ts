import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoaderSpinerService } from 'app/main/pages/loader-spiner/loader-spiner.service';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { StaffInformation, StaffResponse } from '../modal/staff';
import { StaffInfoService } from '../services/staff-info.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/pdf_exporter';


import * as jsPDF from "jspdf";
//import html2canvas from "html2canvas";
//import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import "jspdf-autotable";


@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.scss']
})
export class ViewStaffComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  
   
  staffInfoDataSource : StaffInformation[];
  

  displayedColumns = [    
    "name",       
    "officialEmail",
    "mobileNumber",
    "birthDate",
    "gender",    
    "joinningDate",
    "appointmentDate",
    "birthPlace" ,
    "countryOrigin",
    "nationality",        
    "visaType",
    "age",    
    "phone",
    "maritalStatus",
    "passportNumber",
    "passportExpiry",
    "laborCardNumber",
    "laborCardExpiry",
    "licenseNumber",
    "licenseExpiry",
    "PresentAddress",
    "permanentAddress",
    "homePhone",
    "homeMobileNumber",
    "personalEmail",
    "personName",
    "relation",
    "contactNumber",
    "personEmail",
    "address",
    "remark",
    "staffName",
    "submitDate",
    "officialName",
    "noteDate",
    "remarks",
    "officeUse",
  
];

  constructor(private fb: FormBuilder,
    private _loaderService: LoaderSpinerService,
    private _services: StaffInfoService,
    private _messageNotification:MessageNotifierService,
    private _httpClient: HttpClient) {

     }

  ngOnInit(): void {
    this.getAllStaffInfromation();
  }
  

  
  getAllStaffInfromation(){   
    this._services.getStaffInformation().subscribe(response =>{     
      this.staffInfoDataSource = response.staffInformation;        
    });
  }


//   downloadPDF() {
//     let DATA = document.getElementById("gridContainer");
//     console.log("DATA", DATA);
//     html2canvas(DATA).then((canvas) => {
//         let fileWidth = 250;
//         let fileHeight = (canvas.height * fileWidth) / canvas.width;
//         const FILEURI = canvas.toDataURL("image/png");
//         let PDF = new jsPDF("p", "mm", "a4");
//         let position = 0;
//         PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
//         PDF.save("resource-report.pdf");
//     });
// }




onExporting(e) {
  const doc = new jsPDF();
  exportDataGrid({
    jsPDFDocument: doc,
    component: e.component,    
  }).then(() => {
    doc.save('staffInfo.pdf');
  });
}

}


// onExporting(e) {
//   const workbook = new Workbook();
//   const worksheet = workbook.addWorksheet('Employees');

//   exportDataGrid({
//     component: e.component,
//     worksheet,
//     autoFilterEnabled: true,
//   }).then(() => {
//     workbook.xlsx.writeBuffer().then((buffer) => {
//       saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'staffInfo.xlsx');
//     });
//   });
//   e.cancel = true;
// }