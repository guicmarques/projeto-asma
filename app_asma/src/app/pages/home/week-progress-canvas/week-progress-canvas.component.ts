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

  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.days = this.dateService.getLastDays(3);
    console.log('Dias considerados: ',this.days);
    this.createLineChart(this.weekProgressCanvas);
  }

  createLineChart(chart){
    this.data = chart;
    this.line = new Chart(this.weekProgressChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['', '', '', ''],
        datasets: [{
          data: [5000, 8000, 3000, 6500],
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
