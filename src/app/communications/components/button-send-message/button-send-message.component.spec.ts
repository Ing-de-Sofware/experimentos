import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSendMessageComponent } from './button-send-message.component';

describe('ButtonSendMessageComponent', () => {
  let component: ButtonSendMessageComponent;
  let fixture: ComponentFixture<ButtonSendMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonSendMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
