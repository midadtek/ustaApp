import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUstasPage } from './order-ustas.page';

describe('OrderUstasPage', () => {
  let component: OrderUstasPage;
  let fixture: ComponentFixture<OrderUstasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUstasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUstasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
