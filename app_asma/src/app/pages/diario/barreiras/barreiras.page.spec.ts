import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarreirasPage } from './barreiras.page';

describe('BarreirasPage', () => {
  let component: BarreirasPage;
  let fixture: ComponentFixture<BarreirasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarreirasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarreirasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
