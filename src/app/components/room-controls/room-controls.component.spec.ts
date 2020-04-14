import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomControlsComponent } from '@src/app/components/room-controls/room-controls.component';

describe('RoomControlsComponent', () => {
  let component: RoomControlsComponent;
  let fixture: ComponentFixture<RoomControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
