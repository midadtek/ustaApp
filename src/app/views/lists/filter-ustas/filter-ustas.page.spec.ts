import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterUstasPage } from './filter-ustas.page';

describe('FilterUstasPage', () => {
  let component: FilterUstasPage;
  let fixture: ComponentFixture<FilterUstasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterUstasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterUstasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
