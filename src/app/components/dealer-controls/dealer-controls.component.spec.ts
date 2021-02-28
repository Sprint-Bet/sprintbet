import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerControlsComponent } from 'src/app/components/dealer-controls/dealer-controls.component';

describe('DealerControlsComponent', () => {
  let component: DealerControlsComponent;
  let fixture: ComponentFixture<DealerControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
