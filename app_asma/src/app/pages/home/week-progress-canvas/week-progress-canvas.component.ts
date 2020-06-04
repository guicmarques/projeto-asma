import { SensorService } from './../../../services/sensor.service';
import { Chart } from 'chart.js';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-week-progress-canvas',
  templateUrl: './week-progress-canvas.component.html',
  styleUrls: ['./week-progress-canvas.component.scss'],
})
export class WeekProgressCanvasComponent implements OnInit {
  @Input() weekProgressCanvas: any[];
  @ViewChild("weekProgressChart", { static: true }) weekProgressChart;

  line: any;
  data: any[];

  days: any[] = [];

  today: any;

  weekProgress: any = {
    data: [],
  };

  lastDays: any = { data: [] };

  constructor(private dateService: DateService, private sensorService: SensorService) { }

  ngOnInit() {
    this.sensorService.getSensorData('').then(data =>{
      console.log(data);
      this.getDate();
      /*this.weekProgress = data;
      this.weekProgress.data.forEach(element => {
        if (element.date === this.today) {
          if (element.data.StepTotal.length >= 4){
            this.weekProgressCanvas = element.data.StepTotal.slice(-4);
          } else if (element.data.StepTotal.length === 3) {
            this.weekProgressCanvas = [0];
            this.weekProgressCanvas = this.weekProgressCanvas.concat(element.data.StepTotal);
          } else if (element.data.StepTotal.length === 2) {
            this.weekProgressCanvas = [0, 0];
            this.weekProgressCanvas = this.weekProgressCanvas.concat(element.data.StepTotal);
          } else {
            this.weekProgressCanvas = [0, 0, 0];
            this.weekProgressCanvas = this.weekProgressCanvas.concat(element.data.StepTotal);
          }
          this.createLineChart(this.weekProgressCanvas);
        }
      });*/

      this.getLastDays(3).then(dates => {
        this.sensorService.getSensorData(this.lastDays).then(daysSteps => {
          let result = JSON.stringify(daysSteps);
          this.weekProgress = JSON.parse(result);
          this.weekProgressCanvas = [];
          console.log(this.weekProgress);
          for (let i = 0; i < 3; i++) {
            this.days.push(this.lastDays[i].split('-')[2]);
            if (this.weekProgress[dates[i]] != undefined) {
              console.log('oi');
              this.weekProgressCanvas.push(this.weekProgress[dates[i]].summary.steps);
            } else {
              this.weekProgressCanvas.push(0);
            }
          }
          result = JSON.stringify(data);
          this.weekProgress = JSON.parse(result);
          this.weekProgressCanvas.push(this.weekProgress[this.today].summary.steps);
          console.log(this.weekProgressCanvas);
          this.days.push('Hoje');
          this.createLineChart(this.weekProgressCanvas);
        })
      })
  
    })
  }

  getDate() {
    let  date = []
    date = this.dateService.getDate();
    this.today = date[3] + '-' + date[4] + '-' + date[1];
  }

  getLastDays(quantity: number) {
    return new Promise ((resolve, reject) => {
      let completeDays = this.dateService.getLastDays(quantity);
      this.lastDays = completeDays.slice(0,3);
      resolve(completeDays);
    })
  }

  createLineChart(chart){
    this.data = chart;
    this.line = new Chart(this.weekProgressChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['', '', '', ''],
        datasets: [{
          data: this.weekProgressCanvas,
          backgroundColor: 'rgba(45, 210, 194, 0.3)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(45, 210, 194)',// array should have same number of elements as number of dataset
          borderWidth: 2,
          cubicInterpolationMode: 'monotone',
        }]
      },
      options: {
        legend: {
          display: false,
          labels: {
            fontFamily: 'Montserrat'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false,
            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
          }]
        }
      }
    });
  }
  

}
