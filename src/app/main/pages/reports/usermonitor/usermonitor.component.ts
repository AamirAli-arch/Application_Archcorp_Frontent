import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { result } from 'lodash';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-usermonitor',
  templateUrl: './usermonitor.component.html',
  styleUrls: ['./usermonitor.component.scss']
})
export class UsermonitorComponent implements OnInit {
  listResult: any[] = [];
  listUsers: any[] = [];
  selectedUser: string;
  isLoadingResults = true;


  //doughnut CHART
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: { position: 'right', labels: { boxWidth: 6, usePointStyle: true } }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['#40f4a6', '#dbaec5', '#25e91e', '#f9575e', '#4c1b42', '#b2a73e',
        '#8339d0', '#2d87d3', '#98ecad', '#452798', '#aa81e5', '#7890ff', '#c3492e', '#530e72', '#0ac335']
    },
  ];


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


  constructor(public _userMonitorService: ReportsService, private _fuseConfigService: FuseConfigService) {
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
  }

  getChartData(startDate,endDate){
    this._userMonitorService.getUserMonitor(startDate, endDate).subscribe(response => {
      //map response to only 3 fields
      let result = response.map(a => a.fields).map(b => b?.UserMonitiorInfo)
      this.listResult = result;

      result = result.filter(function (e) {
        return e?.Username !== null;
      });

      var userGroup = result.reduce((p, c) => {
        var name = c?.Username;
        if (!p.hasOwnProperty(name)) {
          p[name] = 0;
        }
        p[name]++;
        return p;
      }, {});

      var userExtended = Object.keys(userGroup).map(k => {
        return { name: k, count: userGroup[k] };
      });
      userExtended = userExtended.filter(function (e) {
        return e?.name !== "undefined";
      });
      this.listUsers = userExtended;

      this.updateChart(result);
      this.getUserIdleVsWorkTime(result);
      this.getAppIdleVsWorkTime(result);
      this.isLoadingResults = false;
    });
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

    let filtered = this.listResult.filter(function (e) {
      return e?.Username === userValue;
    });
    this.updateChart(filtered);

    this.getUserIdleVsWorkTime(filtered);
    this.getAppIdleVsWorkTime(filtered);
  }

  getUserIdleVsWorkTime(list) {

    const [idle, work] =                             // Use "deconstruction" style assignment
    list.reduce((result, element) => {
        result[element?.UserIdleTime > 0 ? 0 : 1].push(element); // Determine and push to small/large arr
        return result;
      },
        [[], []]);

    var userIdleGroup = idle.reduce((p, c) => {
      var name = c?.Username;
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});

    var userWorkGroup = work.reduce((p, c) => {
      var name = c?.Username;
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});

    var userIdleGroupExtended = Object.keys(userIdleGroup).map(k => {
      return {
        name: this.toTitleCase(k.replace("AAEDXB\\", "").replace(".", " ")),
        idleValue: (this.secondsToHours(userIdleGroup[k] * 5)),
        idle: (this.secondsToHms(userIdleGroup[k] * 5))
      };
    });

    var userWorkGroupExtended = Object.keys(userWorkGroup).map(k => {
      return {
        name: this.toTitleCase(k.replace("AAEDXB\\", "").replace(".", " ")),
        workValue: (this.secondsToHours(userWorkGroup[k] * 5)),
        work: (this.secondsToHms(userWorkGroup[k] * 5))
      };
    });

    const result = userIdleGroupExtended.map(v => ({ ...v, ...userWorkGroupExtended.find(sp => sp.name === v.name) }));

    var labels = result.map(function (e) {
      return e.name;
    });
    

    //create sperate array for values
    var idelValues = result.map(function (e) {
      return e.idleValue;
    });

    var workValue = result.map(function (e) {
      return e.workValue;
    });

    this.barChartLabels = labels;
    const chartData: ChartDataSets[] = [];
    chartData.push(
      { data: workValue, label: 'Work', backgroundColor: '#34eb77' },
      { data: idelValues, label: 'Idle', backgroundColor: '#ebab34' }
    );
    this.barChartData = chartData;

  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    const startDate = this.fixDate(dateRangeStart.value);
    const endDate = this.fixDate(dateRangeEnd.value);
    if (dateRangeStart.value != '' && dateRangeEnd.value != '') {
      this.getChartData(dateRangeStart.value, dateRangeEnd.value);
    }
  }


  getAppIdleVsWorkTime(list) {
    const [idle, work] =                             // Use "deconstruction" style assignment
    list.reduce((result, element) => {
        result[element?.UserIdleTime > 0 ? 0 : 1].push(element); // Determine and push to small/large arr
        return result;
      },
        [[], []]);

    var appIdleGroup = idle.reduce((p, c) => {
      var name = c?.ApplicationName;
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});

    var appWorkGroup = work.reduce((p, c) => {
      var name = c?.ApplicationName;
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});

    var appIdleGroupExtended = Object.keys(appIdleGroup).map(k => {
      return {
        name: this.toTitleCase(k),
        idleValue: (this.secondsToHours(appIdleGroup[k] * 5)),
        idle: (this.secondsToHms(appIdleGroup[k] * 5))
      };
    });

    var appWorkGroupExtended = Object.keys(appWorkGroup).map(k => {
      return {
        name: this.toTitleCase(k),
        workValue: (this.secondsToHours(appWorkGroup[k] * 5)),
        work: (this.secondsToHms(appWorkGroup[k] * 5))
      };
    });

    const result = appIdleGroupExtended.map(v => ({ ...v, ...appWorkGroupExtended.find(sp => sp.name === v.name) }));

    var labels = result.map(function (e) {
      return e.name;
    });

    //create sperate array for values
    var idelValues = result.map(function (e) {
      return e.idleValue;
    });

    var workValue = result.map(function (e) {
      return e.workValue;
    });

    this.appBarChartLabels = labels;
    const chartData: ChartDataSets[] = [];
    chartData.push(
      { data: workValue, label: 'Work', backgroundColor: '#34eb77' },
      { data: idelValues, label: 'Idle', backgroundColor: '#ebab34' }
    );
    this.appBarChartData = chartData;

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

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

}
