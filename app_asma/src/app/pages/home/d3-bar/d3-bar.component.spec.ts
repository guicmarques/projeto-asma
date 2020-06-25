import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { D3BarComponent } from './d3-bar.component';

describe('D3BarComponent', () => {
  let component: D3BarComponent;
  let fixture: ComponentFixture<D3BarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3BarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(D3BarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
