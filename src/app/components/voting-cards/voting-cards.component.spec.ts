import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingCardsComponent } from '@src/app/components/voting-cards/voting-cards.component';

describe('VotingCardsComponent', () => {
  let component: VotingCardsComponent;
  let fixture: ComponentFixture<VotingCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
