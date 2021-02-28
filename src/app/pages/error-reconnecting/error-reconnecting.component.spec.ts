import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorReconnectingComponent } from 'src/app/pages/error-reconnecting/error-reconnecting.component';

describe('ErrorReconnectingComponent', () => {
  let component: ErrorReconnectingComponent;
  let fixture: ComponentFixture<ErrorReconnectingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorReconnectingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorReconnectingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
