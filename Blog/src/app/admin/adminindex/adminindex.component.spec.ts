import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminindexComponent} from './adminindex.component';

describe('AdminindexComponent', () => {
  let component: AdminindexComponent;
  let fixture: ComponentFixture<AdminindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminindexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
