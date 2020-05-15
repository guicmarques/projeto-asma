import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeekProgressCanvasComponent } from './week-progress-canvas.component';

describe('WeekProgressCanvasComponent', () => {
  let component: WeekProgressCanvasComponent;
  let fixture: ComponentFixture<WeekProgressCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekProgressCanvasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeekProgressCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
