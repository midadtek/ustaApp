import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBannerPage } from './profile-banner.page';

describe('ProfileBannerPage', () => {
  let component: ProfileBannerPage;
  let fixture: ComponentFixture<ProfileBannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBannerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
