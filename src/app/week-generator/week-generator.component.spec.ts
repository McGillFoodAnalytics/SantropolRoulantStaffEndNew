import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekGeneratorComponent } from './week-generator.component';

describe('WeekGeneratorComponent', () => {
  let component: WeekGeneratorComponent;
  let fixture: ComponentFixture<WeekGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
