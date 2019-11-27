import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { resultsPage } from './results.page';

describe('resultsPage', () => {
  let component: resultsPage;
  let fixture: ComponentFixture<resultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ resultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(resultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
