import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { result } from 'lodash';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ProjectClient } from 'app/main/charts/chart/services/ApiServices';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

import { interval, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import * as _ from 'lodash';
import { DateSelectionModelChange } from '@angular/material/datepicker';

@Component({
  selector: 'app-revit-tracking',
  templateUrl: './revit-tracking.component.html',
  styleUrls: ['./revit-tracking.component.scss']
})


export class RevitTrackingComponent implements OnInit {
  listResult: any[] = [];
  listUsers: any[] = [];
  listUserDropDown: any[] = [];
  listProjects: any[] = [];
  selectedUser: string;
  isLoadingResults = true;

  showFilter: boolean = true;
  intervalId: number = 0;
  subscription: Subscription;
  projectName : string;
  refreshType : string;

  userIntervalId: number = 0;
  userSubscription: Subscription;
  lastUpdated;


  //doughnut CHART
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins:{
      datalabels: {
        anchor: 'center',
        color:'white'
      }
    },
    legend: { position: 'top', labels: { boxWidth: 6, usePointStyle: true } }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [];
  public pieChartPlugin = [ChartDataLabels]

  //Different discipline
  public pieArchitectural: SingleDataSet = [];
  public pieMechanical: SingleDataSet = [];
  public pieElectrical: SingleDataSet = [];
  public pieStructural: SingleDataSet = [];


  //doughnut discipline CHART
  public disciplinePieChartOptions: ChartOptions = {
    responsive: true,
    plugins:{
      datalabels: {
        color: '#ffffff'
      }
    },
    legend: { position: 'right', labels: { boxWidth: 6, usePointStyle: true } }
  };
  public disciplinePieChartLabels: Label[] = [];
  public disciplinePieChartData: SingleDataSet = [];
  public disciplinePieChartType: ChartType = 'doughnut';
  public disciplinePieChartLegend = true;
  public disciplinePieChartPlugins = [];
  public disciplinePieChartColors = [
    {
      backgroundColor: ['#01B8AA',
      '#374649',
      '#FD625E',
      '#F2C80F',
      '#5F6B6D',
      '#8AD4EB',
      '#FE9666',
      '#b85a75',
      '#a66999',
      '#8ad4eb',
      '#01b8aa',
      '#fd625e',
      '#185a93',
      '#17999d',
      '#1963ab']
    },
  ];
  public disciplinePieChartPlugin = [ChartDataLabels]


  //USER BAR CHART
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

  //APP BARCHART
  public appBarChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    }
  };
  public appBarChartLabels: Label[] = [];
  public appBarChartType: ChartType = 'horizontalBar';
  public appBarChartLegend = true;
  public appBarChartPlugins = [];

  public appBarChartData: ChartDataSets[] = [];


  constructor(private _fuseConfigService: FuseConfigService, public _revitTracking: ReportsService, private _projectClient : ProjectClient, private route: ActivatedRoute) {

    this._fuseConfigService.config = {
      layout: {
        navbar : {
          hidden : true
        },
        toolbar : {
          hidden : true
        }
      }
    }

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getChartData('','');
    this.route.queryParams.subscribe(params => {
      this.refreshType = params["type"];
      if(this.refreshType){
        this.showFilter = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getChartData(startDate,endDate){
    this._revitTracking.getRevitTracking(startDate, endDate).subscribe(response => {
      let result = response.map(a => a?.revitData);
      let count = 0;
      result.forEach(element => {
        count += element.length;
      });
     
      //this.setDiscipline(response);
      this.setStatus(response);
      this.setActiveUser(response);
      this.setActiveSheets(response);
      this.setMultipleDiscipline(response);
      this.setLastUpdated(response);

      //set user dropdown
      this.setDropDownUser(response);


      this.listResult = response;

      var projectGroup = response.reduce((p, c) => {
        var name = c?.projectCode;
        if (!p.hasOwnProperty(name)) {
          p[name] = 0;
        }
        p[name]++;
        return p;
      }, {});

      var projectExtended = Object.keys(projectGroup).map(k => {
        return { name: k, count: projectGroup[k] };
      });

      projectExtended = projectExtended.filter(function (e) {
        return e?.name !== undefined;
      });

      

      this._projectClient.projects().subscribe(projectResponse => {

        let result = projectExtended.map(a => ({...projectResponse.projects.find(p => a.name === p.projectCode), ...a}));
        
        result = result.filter(function (e) {
          return e?.projectCode !== undefined;
        });


        this.listProjects = result;
        if(this.refreshType === "project"){
          const source = interval(10000);
          this.subscription = source.subscribe(val => this.updateProject(this.listProjects));
        }

      });
      this.isLoadingResults = false;
    });
  }

  setDropDownUser(response){
    let result = response.map(a => a?.revitData);
    var filtered = result.reduce((p, c) => {
      var len = c?.length;
      if (len > 0) {
        p.push(c);
      }
      return p;
    }, []);
    var flattened = [].concat.apply([],filtered);
    var userGroup = response.reduce((p, c) => {
      var name = c?.userName;
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});


    var userExtended = Object.keys(userGroup).map(k => {
      return { name: this.transform(k), value: k, count: userGroup[k] };
    });
    this.listUserDropDown = userExtended;
  }

  setMultipleDiscipline(response){
    let structural = response.filter(function (e){
      return e?.discipline === "Structural";
    });
    let architectural = response.filter(function (e){
      return e?.discipline === "Architectural";
    });
    let mechanical = response.filter(function (e){
      return e?.discipline === "Mechanical ";
    });
    let electrical = response.filter(function (e){
      return e?.discipline === "Electrical";
    });

    structural = structural.map(a => a?.revitData);
    architectural = architectural.map(a => a?.revitData);
    mechanical = mechanical.map(a => a?.revitData);
    electrical = electrical.map(a => a?.revitData);

    structural = structural.reduce((p, c) => {
      var len = c?.length;
      if (len > 0) {
        p.push(c);
      }
      return p;
    }, []);
    mechanical = mechanical.reduce((p, c) => {
      var len = c?.length;
      if (len > 0) {
        p.push(c);
      }
      return p;
    }, []);
    electrical = electrical.reduce((p, c) => {
      var len = c?.length;
      if (len > 0) {
        p.push(c);
      }
      return p;
    }, []);
    architectural = architectural.reduce((p, c) => {
      var len = c?.length;
      if (len > 0) {
        p.push(c);
      }
      return p;
    }, []);

    var flattenedstructural = [].concat.apply([],structural);
    var flattenedmechanical = [].concat.apply([],mechanical);
    var flattenedelectrical = [].concat.apply([],electrical);
    var flattenedarchitectural = [].concat.apply([],architectural);

    const mstructural = flattenedstructural.filter(function (e){
      return e?.status === "modified";
    });
    const astructural = flattenedstructural.filter(function (e){
      return e?.status === "added";
    });
    const dstructural = flattenedstructural.filter(function (e){
      return e?.status === "deleted";
    });

    const mmechanical = flattenedmechanical.filter(function (e){
      return e?.status === "modified";
    });
    const amechanical = flattenedmechanical.filter(function (e){
      return e?.status === "added";
    });
    const dmechanical = flattenedmechanical.filter(function (e){
      return e?.status === "deleted";
    });

    const melectrical = flattenedelectrical.filter(function (e){
      return e?.status === "modified";
    });
    const aelectrical = flattenedelectrical.filter(function (e){
      return e?.status === "added";
    });
    const delectrical = flattenedelectrical.filter(function (e){
      return e?.status === "deleted";
    });

    const marchitectural = flattenedarchitectural.filter(function (e){
      return e?.status === "modified";
    });
    const aarchitectural = flattenedarchitectural.filter(function (e){
      return e?.status === "added";
    });
    const darchitectural = flattenedarchitectural.filter(function (e){
      return e?.status === "deleted";
    });

    let labels = ["Added", "Modified", "Deleted"];
    let dataStructural = [astructural.length, mstructural.length, dstructural.length];
    let dataMechanical = [amechanical.length, mmechanical.length, dmechanical.length];
    let dataElectrical = [aelectrical.length, melectrical.length, delectrical.length];
    let dataArchitectural = [aarchitectural.length, marchitectural.length, darchitectural.length];

    this.pieChartLabels = labels;

    this.pieArchitectural = dataArchitectural;
    this.pieElectrical = dataElectrical;
    this.pieMechanical = dataMechanical;
    this.pieStructural = dataStructural;

    this.pieChartColors = [
      {
        backgroundColor: ['#148360', '#F2BB13', '#f90000']
      }
    ];
  }

  setDiscipline(response, discipline) {
    const filteredByDis = response.filter(function (e){
      return e?.discipline === discipline;
    });

    let result = filteredByDis.map(a => a?.revitData);
    var filtered = result.reduce((p, c) => {
      var len = c?.length;
      if (len > 0) {
        p.push(c);
      }
      return p;
    }, []);
    var flattened = [].concat.apply([],filtered);

    const modified = flattened.filter(function (e){
      return e?.status === "modified";
    });
    const added = flattened.filter(function (e){
      return e?.status === "added";
    });
    const deleted = flattened.filter(function (e){
      return e?.status === "deleted";
    });

    let labels = ["Added", "Modified", "Deleted"];
    let data = [added.length, modified.length, deleted.length];
    this.pieChartLabels = labels;
    this.pieChartData = data;
    this.pieChartColors = [
      {
        backgroundColor: ['#2bcc38', '#d6973e', '#c43d3b']
      }
    ];
  }

  setStatus(response){
    //map response to only 3 fields
    let result = response.map(a => a?.revitData);
    var filtered = result.reduce((p, c) => {
      var len = c?.length;
      if (len > 0) {
        p.push(c);
      }
      return p;
    }, []);
    var flattened = [].concat.apply([],filtered);

    const modified = flattened.filter(function (e){
      return e?.status === "modified";
    });
    const added = flattened.filter(function (e){
      return e?.status === "added";
    });
    const deleted = flattened.filter(function (e){
      return e?.status === "deleted";
    });

    let labels = ["Added", "Modified", "Deleted"];
    let data = [added.length, modified.length, deleted.length];
    this.pieChartLabels = labels;
    this.pieChartData = data;
    this.pieChartColors = [
      {
        backgroundColor: ['#2bcc38', '#000000', '#E74335']
      }
    ];
  }

  setActiveUser(response){
    let result = response.map(a => ({userName: a.userName, dataCount: a.revitData.length}));
     var userGroup = result.reduce((p, c) => {
      var name = c.userName;
      var count = c.dataCount;
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name] += count;
      return p;
    }, {});

    var userExtended = Object.keys(userGroup).map(k => {
      return { name: this.transform(k), value: k, count: userGroup[k] };
    });

    this.listUsers = userExtended;

    

    if(this.refreshType === "user"){
      const userSource = interval(20000);
      this.userSubscription = userSource.subscribe(val => this.updateUsers(userExtended))
    }


    userExtended = userExtended.filter(function (e) {
      return e?.name !== "undefined";
    });


    const userResult = userExtended.map(v => ({ ...v, ...userExtended.find(sp => sp.name === v.name) }));

    var labels = userResult.map(function (e) {
      return e.name;
    });


    //create sperate array for values
    var values = userResult.map(function (e) {
      return e.count;
    });

    this.disciplinePieChartLabels = labels;
    this.disciplinePieChartData = values;


  }

  setActiveSheets(response){
    var sheetGroup = response.reduce((p, c) => {
        var name = c?.projectName;
        if (!p.hasOwnProperty(name)) {
          p[name] = 0;
        }
        p[name]++;
        return p;
      }, {});

      //extend the object to array
    var sheetExtended = Object.keys(sheetGroup).map(k => {
      return { name: this.toTitleCase(k), count: sheetGroup[k] };
    });

    var sorted = sheetExtended.sort((a, b) => (a.count > b.count) ? -1 : 1).slice(0, 15);

    //create seperate array for labels
    var labels = sorted.map(function (e) {
      return e.name;
    });

    //create sperate array for values
    var values = sorted.map(function (e) {
      return e.count;
    });

    this.appBarChartLabels = labels;
    const chartData: ChartDataSets[] = [];
    chartData.push(
      { data: values, label: 'Work', backgroundColor: '#34eb77' },
    );
    this.appBarChartData = chartData;


  }

  updateChart(list) {
    //reduce it to group by and get application count
    var counts = list.reduce((p, c) => {
      var name = c?.ApplicationName;
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});

    //extend the object to array
    var countsExtended = Object.keys(counts).map(k => {
      return { name: this.toTitleCase(k), count: counts[k] };
    });
    //sort the array
    var sorted = countsExtended.sort((a, b) => (a.count > b.count) ? -1 : 1).slice(0, 15);

    //create seperate array for labels
    var labels = sorted.map(function (e) {
      return e.name;
    });

    //create sperate array for values
    var values = sorted.map(function (e) {
      return e.count;
    });

    //set the piechart values
    this.pieChartLabels = labels;
    this.pieChartData = values;


  }

  filterUser(event) {
    const userValue = event.value;

    // const res = this.listResult.map((element) => {
    //   return {...element, revitData: element.revitData.filter((revitData) => revitData.createdBy === userValue)}
    // })

    const res = this.listResult.filter(function (e) {
      return e?.userName === userValue;
    });

    this.setStatus(res);
    this.setActiveUser(res);
    this.setActiveSheets(res);
    this.setMultipleDiscipline(res);
    this.setLastUpdated(res);

  }

  filterDiscipline(event) {
    const userValue = event.value;

    this.setDiscipline(this.listResult, userValue);
  }

  updateUsers(userList){
    if(this.userIntervalId == userList.length - 1){
      this.userIntervalId = 0;
      this.updateResponseAsync();
    }else{
      this.userIntervalId++;
    }

    const user = userList[this.intervalId].name;
    this.projectName = userList[this.intervalId].name;
    const res = this.listResult.filter(function (e) {
      return e?.userName === user;
    });

    this.setStatus(res);
    this.setActiveUser(res);
    this.setActiveSheets(res);
    this.setMultipleDiscipline(res);
    this.setLastUpdated(res);
  }

  async updateProject(projectList){
    if(this.intervalId == this.listProjects.length - 1){
      this.intervalId = 0;
      await this.updateResponseAsync();
    }else{
      this.intervalId++;
    }

    const code = projectList[this.intervalId].projectCode;
    this.projectName = code + " - " + projectList[this.intervalId].projectName;
    let filtered = this.listResult.filter(function (e) {
      return e?.projectCode === code;
    });

    this.setStatus(filtered);
    this.setActiveUser(filtered);
    this.setActiveSheets(filtered);
    this.setMultipleDiscipline(filtered);
    this.setLastUpdated(filtered);
  }

  async updateResponseAsync(){
    this._revitTracking.getRevitTracking('','').toPromise().then(data => {
      this.listResult = data;
    })
  }

  filterProject(event) {
    const projectValue = event.value;
    const projectName = event.source.triggerValue;
    this.projectName = projectValue + " - " + projectName;
    let filtered = this.listResult.filter(function (e) {
      return e?.projectCode === projectValue;
    });

    this.listResult = filtered;

    this.setStatus(filtered);
    this.setActiveUser(filtered);
    this.setActiveSheets(filtered);
    this.setMultipleDiscipline(filtered);
    this.setLastUpdated(filtered);
  }

  setLastUpdated(response){
    let listDates = response.map(a => moment(a?.createdOn, "YYYY-MM-DDThh:mm:ss"));
    let sortedArray = listDates.sort((a, b) => a.valueOf() - b.valueOf())
    this.lastUpdated = sortedArray[sortedArray.length - 1];
  }


  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    const startDate = this.fixDate(dateRangeStart.value);
    const endDate = this.fixDate(dateRangeEnd.value);
    if (dateRangeStart.value != '' && dateRangeEnd.value != '') {
      this.getChartData(dateRangeStart.value, dateRangeEnd.value);
    }
  }



  mergeArrayObjects(arr1, arr2) {
    return arr1.map((item, i) => {
      if (item.name.trim() === arr2[i].name.trim()) {
        //merging two objects
        return Object.assign({}, item, arr2[i])
      }
    })
  }

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  secondsToHours(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var c = h + "." + m;

    return parseFloat(c);
  }

  fixDate(date){
    date = new Date(date);
    let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);
    return date;
  }

  transform(value: string): string {
    if(value != null){
      value = value.replace("AAEDXB\\","");
      value = value.replace("@archcorp.biz","");
      value = value.replace("."," ");
      value = value.replace("caluagEJS3B","caluag");
      return this.toTitleCase(value);
    }
  }

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

}
