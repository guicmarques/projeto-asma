import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExerciciosPage } from './exercicios.page';

describe('ExerciciosPage', () => {
  let component: ExerciciosPage;
  let fixture: ComponentFixture<ExerciciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciciosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
