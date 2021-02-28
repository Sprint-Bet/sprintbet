import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePageJoinComponent } from 'src/app/pages/welcome-page-join/welcome-page-join.component';

describe('WelcomePageJoinComponent', () => {
  let component: WelcomePageJoinComponent;
  let fixture: ComponentFixture<WelcomePageJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomePageJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePageJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
