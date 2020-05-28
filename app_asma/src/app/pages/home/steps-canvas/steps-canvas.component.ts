import { DateService } from './../../../services/date.service';
import { SensorService } from './../../../services/sensor.service';
import { Chart } from 'chart.js';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GoalsService } from 'src/app/services/goals.service';

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
  today: any;

  myGoals: any = {
    activeGoals: [],
    inactiveGoals: []
  };

  dailySteps: any = {
    data: [],
  };

  goal: number = 0;
  goalPrevious: number = 0;

  walkingPersonImg:  String = '../../../assets/images/walking_white_blue.png';

  constructor(private sensorService: SensorService, private dateService: DateService,
              private goalsService: GoalsService) { }


  ngOnInit() {
    this.sensorService.getSensorData('', 'daily-steps').then(data =>{
      console.log(data);
      this.goalsService.getGoals().then(goals => {
        console.log('Minhas metas:', goals);
        this.myGoals = goals;
        this.myGoals.activeGoals.forEach(element => {
          if (element.activity === 'Caminhada') {
            this.goal = element.quantity;
            this.goalPrevious = this.goal;
          }
        });
        this.getDate();
        this.dailySteps = data;
        this.dailySteps.data.forEach(element => {
          if (element.date === this.today) {
            this.stepCanvas = element.data.StepTotal[6];
            this.createDounutChart(this.stepCanvas);
            console.log(typeof(this.stepCanvas));
          }
        });
        setInterval(() => { this.reloadChart() }, 1800000);
      })
    })
  }

  reloadChart() {
    this.sensorService.getSensorData('', 'daily-steps').then(steps => {
      this.goalsService.getGoals().then(metas => {
        this.myGoals = metas;
        this.myGoals.activeGoals.forEach(element => {
          if (element.activity === 'Caminhada') {
            this.goal = element.quantity;
          }
        });
        if (this.goalPrevious !== this.goal) {
          this.createDounutChart(this.stepCanvas);
          this.goalPrevious = this.goal;
        }

        this.getDate();
        this.dailySteps = steps;
        this.dailySteps.data.forEach(element => {
          if (element.date === this.today) {
            this.stepCanvas = element.data.StepTotal[6];
            this.createDounutChart(this.stepCanvas);
          }
        });
      });
    });
  }

  getDate() {
    let  date = []
    date = this.dateService.getDate();

    this.date =  date[1] + ' de ' + date[2];
    this.today = date[3] + '-' + date[4] + '-' + date[1];
  }

  createDounutChart(data: any){
    console.log(data);
    this.data = data;
    this.doughnut = new Chart(this.stepsChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Passos diários', '/8000 passos'],
        datasets: [{
          label: '/8000 passos',
          data: [data, (this.goal-data)],
          backgroundColor: ['rgb(255,255,255)', 'rgba(0,0,0,0)'], // array should have same number of elements as number of dataset
          borderColor: ['rgb(255, 255, 255)', 'rgba(0,0,0,0)'],// array should have same number of elements as number of dataset
          borderWidth: 7,
        }]
      },
      options: {
        elements: {
          point: {
            pointStyle: 'rectRounded',
            hitRadius: 50, 
          },
          line: {
            borderJoinStyle: "round"
          }
        },
        legend: {
          display: false,
          labels: {
            fontFamily: 'Montserrat'
          }
        },
        scales: {
          gridLines: {
            display: false,
          }
        },
        cutoutPercentage: 95,
      }
    });
  }

}
