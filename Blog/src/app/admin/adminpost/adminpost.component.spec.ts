import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpostComponent } from './adminpost.component';

describe('AdminpostComponent', () => {
  let component: AdminpostComponent;
  let fixture: ComponentFixture<AdminpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
