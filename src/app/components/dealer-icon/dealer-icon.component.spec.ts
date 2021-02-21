import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerIconComponent } from 'src/app/components/dealer-icon/dealer-icon.component';

describe('DealerIconComponent', () => {
  let component: DealerIconComponent;
  let fixture: ComponentFixture<DealerIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
