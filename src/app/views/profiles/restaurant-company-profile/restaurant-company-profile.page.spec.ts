import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { restaurantcompanyprofilePage } from './restaurant-company-profile.page';

describe('restaurantcompanyprofilePage', () => {
  let component: restaurantcompanyprofilePage;
  let fixture: ComponentFixture<restaurantcompanyprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ restaurantcompanyprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(restaurantcompanyprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
