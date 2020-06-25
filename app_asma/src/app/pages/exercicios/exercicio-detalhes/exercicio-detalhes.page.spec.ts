import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExercicioDetalhesPage } from './exercicio-detalhes.page';

describe('ExercicioDetalhesPage', () => {
  let component: ExercicioDetalhesPage;
  let fixture: ComponentFixture<ExercicioDetalhesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercicioDetalhesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExercicioDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
