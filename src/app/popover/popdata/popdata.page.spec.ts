import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopdataPage } from './popdata.page';

describe('PopdataPage', () => {
  let component: PopdataPage;
  let fixture: ComponentFixture<PopdataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopdataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopdataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
