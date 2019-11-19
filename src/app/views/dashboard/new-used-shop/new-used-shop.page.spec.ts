import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsedShopPage } from './new-used-shop.page';

describe('NewUsedShopPage', () => {
  let component: NewUsedShopPage;
  let fixture: ComponentFixture<NewUsedShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUsedShopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUsedShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
