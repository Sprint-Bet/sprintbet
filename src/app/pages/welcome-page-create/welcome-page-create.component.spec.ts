import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePageCreateComponent } from 'src/app/pages/welcome-page-create/welcome-page-create.component';

describe('WelcomePageCreateComponent', () => {
  let component: WelcomePageCreateComponent;
  let fixture: ComponentFixture<WelcomePageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomePageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
