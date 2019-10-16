import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyPage } from './new-company.page';

describe('NewCompanyPage', () => {
  let component: NewCompanyPage;
  let fixture: ComponentFixture<NewCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCompanyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
