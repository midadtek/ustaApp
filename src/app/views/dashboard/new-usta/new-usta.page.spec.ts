import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUstaPage } from './new-usta.page';

describe('NewUstaPage', () => {
  let component: NewUstaPage;
  let fixture: ComponentFixture<NewUstaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUstaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUstaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
