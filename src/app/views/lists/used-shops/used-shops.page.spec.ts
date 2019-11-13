import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedShopsPage } from './used-shops.page';

describe('UsedShopsPage', () => {
  let component: UsedShopsPage;
  let fixture: ComponentFixture<UsedShopsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedShopsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedShopsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
