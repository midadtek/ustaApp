import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { housescarstuffprofilePage } from './house-car-stuff-profile.page';

describe('housescarstuffprofilePage', () => {
  let component: housescarstuffprofilePage;
  let fixture: ComponentFixture<housescarstuffprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ housescarstuffprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(housescarstuffprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
