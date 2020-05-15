import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-week-progress-canvas',
  templateUrl: './week-progress-canvas.component.html',
  styleUrls: ['./week-progress-canvas.component.scss'],
})
export class WeekProgressCanvasComponent implements OnInit {
  @Input() weekProgressCanvas: any;
  @ViewChild("weekProgressChart", { static: true }) weekProgressChart;

  bar: any;
  data: any;

  constructor() { }

  ngOnInit() {}

}
