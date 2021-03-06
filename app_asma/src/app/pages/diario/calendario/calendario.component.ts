import { GestureController, Gesture } from '@ionic/angular';
import { EventService } from './../../../services/event.service';
import { DateService } from './../../../services/date.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit {
  @ViewChild('calendar', {static: false}) calendar: ElementRef;

  daysName: string[] = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  week1: number[] = [];
  week2: number[] = [];
  week3: number[] = [];
  week4: number[] = [];
  week5: number[] = [];
  week6: number[] = [];
  month: number;  // Lembrar que sempre fica indice
  year: number;

  opened: boolean = false;

  todayDay: number;
  todayMonth: number;
  todayYear: number;

  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;

  viewMonth: number;
  viewMonthName: string;
  viewYear: number;

  constructor(private dateService: DateService,
              private eventService: EventService,
              private gestureCtrl: GestureController,
              private renderer: Renderer2) {

    this.eventService.subscribe('diaryDateChanged', (data: any) => {
      this.selectedDay = +data.newDate[0];
      this.selectedMonth = +data.newDate[1];
      this.selectedYear = +data.newDate[2];
    });
  }

  ngOnInit() {
    let dd: string;
    let mm: string;
    let yyyy: string;

    [, dd, , yyyy, mm] = this.dateService.getDate();
    this.todayDay = +dd;
    this.todayMonth = +mm;
    this.todayYear = +yyyy;
    this.selectedDay = +dd;
    this.selectedMonth = +mm;
    this.selectedYear = +yyyy;
    this.viewMonth = +mm;
    this.viewMonthName = this.dateService.mesesNames[this.viewMonth - 1];
    this.viewYear = +yyyy;

    this.getFullMonth(this.viewMonth, this.viewYear);
  }
  
  ngAfterViewInit() {
    /*
    const calendarContainer: Gesture = this.gestureCtrl.create({
      el: this.calendar.nativeElement,
      gestureName: "calendar-swipe-down",
      onStart: () => {
        console.log('Starting');
        this.renderer.setStyle(this.calendar.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev);

        if (ev.deltaY < 0) {
          this.renderer.setStyle(this.calendar.nativeElement, "transform", 'translateY(0px)');
        } else if (ev.deltaY >= 0.56*this.screenHeight) {
          this.renderer.setStyle(this.calendar.nativeElement, "transform", `translateY(${0.56*this.screenHeight}px)`);
        } else {
          this.renderer.setStyle(this.calendar.nativeElement, "transform", `translateY(${ev.deltaY}px)`);
        }
      },
      onEnd: ev => {
        console.log("ending");

        this.renderer.setStyle(this.calendar.nativeElement, 'transition', '0.4s ease-out');

        if (ev.velocityY > 0) {
          if (ev.deltaY > 0.09*this.screenHeight) {
            this.renderer.setStyle(this.calendar.nativeElement, "transform", `translateY(${0.56*this.screenHeight}px)`);
          } else {
            this.renderer.setStyle(this.calendar.nativeElement, "transform", 'translateY(0px)');
          } 
        } else {
          if (ev.deltaY < 0.48*this.screenHeight) {
            this.renderer.setStyle(this.calendar.nativeElement, "transform", 'translateY(0px)');
          } else {
            this.renderer.setStyle(this.calendar.nativeElement, "transform", `translateY(${0.56*this.screenHeight}px)`);
          }
        }
      }
    });

    calendarContainer.enable();
    */
  }

  getFullMonth(month: number, year: number) {
    [this.week1, this.week2, this.week3, this.week4, 
      this.week5, this.week6] = this.dateService.getFullMonth(month - 1, year);
    
    console.log('Semana 1:', this.week1);
    console.log('Semana 2:', this.week2);
    console.log('Semana 3:', this.week3);
    console.log('Semana 4:', this.week4);
    console.log('Semana 5:', this.week5);
    console.log('Semana 6:', this.week6);
  }

  previousMonth() {
    this.viewMonth--;

    if (this.viewMonth === 0) {
      this.viewMonth = 12;
      this.viewYear--;
    }

    this.viewMonthName = this.dateService.mesesNames[this.viewMonth - 1];
    this.getFullMonth(this.viewMonth, this.viewYear);
  }

  nextMonth() {
    this.viewMonth++;

    if (this.viewMonth === 13) {
      this.viewMonth = 1;
      this.viewYear++;
    }

    this.viewMonthName = this.dateService.mesesNames[this.viewMonth - 1];
    this.getFullMonth(this.viewMonth, this.viewYear);
  }

  updateDate(date: number[]) {
    this.selectedDay = date[0];
    this.selectedMonth = date[1];
    this.selectedYear = date[2];

    this.eventService.publish('calendarDayChanged', {
      newDate: date,
    });
  }

  moveCalendar() {
    this.renderer.setStyle(this.calendar.nativeElement, 'transition', '0.6s ease-out');

    if (this.opened) {
      this.renderer.setStyle(this.calendar.nativeElement, "transform", 'translateY(0px)');
      this.opened = false;
    } else {
      this.renderer.setStyle(this.calendar.nativeElement, "transform", `translateY(365px)`);
      this.opened = true;
    }

    this.eventService.publish('calendarView', this.opened);
  }
}
