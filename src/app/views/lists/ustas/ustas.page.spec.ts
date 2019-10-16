import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UstasPage } from './ustas.page';

describe('UstasPage', () => {
  let component: UstasPage;
  let fixture: ComponentFixture<UstasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UstasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UstasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
