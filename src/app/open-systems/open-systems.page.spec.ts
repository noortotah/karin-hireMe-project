import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSystemsPage } from './open-systems.page';

describe('OpenSystemsPage', () => {
  let component: OpenSystemsPage;
  let fixture: ComponentFixture<OpenSystemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSystemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSystemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
