import { Chart } from 'chart.js';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-steps-canvas',
  templateUrl: './steps-canvas.component.html',
  styleUrls: ['./steps-canvas.component.scss'],
})
export class StepsCanvasComponent implements OnInit {
  @Input() stepCanvas: any;
  @ViewChild("stepsChart", { static: true }) stepsChart;

  doughnut: any;
  data: any;

  date: any;

  walkingPersonImg:  String = '../../../assets/images/walking_blue_white.png';

  constructor() { }

  ngOnInit() {
    this.createDounutChart(this.stepCanvas);
    this.getDate();
  }

  getDate() {
    let date = new Date();
    let dateString = date.toDateString();
    let fullDate = dateString.split(' ');
    let dia = fullDate[2];
    let mesNumber = fullDate[1];

    let meses = {'January': 'Janeiro', 'February': 'Fevereiro', 'March': 'Março', 'April': 'Abril', 'May': 'Maio', 
                'June':'Junho', 'July': 'Julho', 'August': 'Agosto', 'September': 'Setembro', 'October': 'Outubro', 
                'November': 'Novembro', 'December': 'Dezembro'};

    let mes = meses[mesNumber];

    this.date =  dia + ' de ' + mes;
  }

  createDounutChart(data: any){
    this.data = data;
    this.doughnut = new Chart(this.stepsChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Passos diários', '/8000 passos'],
        datasets: [{
          label: '/8000 passos',
          data: [data, (8000-data)],
          backgroundColor: ['rgb(45, 210, 194)', 'rgba(0,0,0,0)'], // array should have same number of elements as number of dataset
          borderColor: ['rgb(45, 210, 194)', 'rgba(0,0,0,0)'],// array should have same number of elements as number of dataset
          borderWidth: 1,
        }]
      },
      options: {
        legend: {
          display: false,
          labels: {
            fontFamily: 'Segoe UI'
          }
        },
        scales: {
          gridLines: {
            display: false,
          }
        },
        cutoutPercentage: 85,
      }
    });
  }

}
