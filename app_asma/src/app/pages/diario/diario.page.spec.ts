import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiarioPage } from './diario.page';

describe('DiarioPage', () => {
  let component: DiarioPage;
  let fixture: ComponentFixture<DiarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
