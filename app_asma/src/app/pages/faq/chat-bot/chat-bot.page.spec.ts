import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatBotPage } from './chat-bot.page';

describe('ChatBotPage', () => {
  let component: ChatBotPage;
  let fixture: ComponentFixture<ChatBotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
