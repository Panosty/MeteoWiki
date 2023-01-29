import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondtionsActuellesComponent } from './condtions-actuelles.component';

describe('CondtionsActuellesComponent', () => {
  let component: CondtionsActuellesComponent;
  let fixture: ComponentFixture<CondtionsActuellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondtionsActuellesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondtionsActuellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
