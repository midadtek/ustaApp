import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UstaprofilePage } from './ustaprofile.page';

describe('UstaprofilePage', () => {
  let component: UstaprofilePage;
  let fixture: ComponentFixture<UstaprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UstaprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UstaprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
