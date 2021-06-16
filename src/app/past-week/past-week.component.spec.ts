import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastWeekComponent } from './past-week.component';

describe('PastWeekComponent', () => {
  let component: PastWeekComponent;
  let fixture: ComponentFixture<PastWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
