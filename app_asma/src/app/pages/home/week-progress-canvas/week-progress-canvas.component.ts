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

  days: string[];

  today: any;

  constructor(private dateService: DateService, private sensorService: SensorService) { }

  ngOnInit() {
    this.sensorService.getSensorData('', 'daily-steps').then(data =>{
      console.log(data);
      this.getDate();
      data.data.forEach(element => {
        if (element.date === this.today) {
          this.weekProgressCanvas = element.data.StepTotal.slice(-4);
          this.days = this.dateService.getLastDays(3);
          this.createLineChart(this.weekProgressCanvas);
        }
      });
    })

    console.log('Dias considerados: ',this.days);
  }

  getDate() {
    let  date = []
    date = this.dateService.getDate();
    this.today = date[3] + '-' + date[4] + '-' + date[1];
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
