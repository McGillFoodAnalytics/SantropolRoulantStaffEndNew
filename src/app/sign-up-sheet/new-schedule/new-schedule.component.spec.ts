import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScheduleComponent } from './new-schedule.component';

describe('NewScheduleComponent', () => {
  let component: NewScheduleComponent;
  let fixture: ComponentFixture<NewScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
