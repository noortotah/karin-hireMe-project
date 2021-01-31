import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsifasTestPage } from './psifas-test.page';

describe('PsifasTestPage', () => {
  let component: PsifasTestPage;
  let fixture: ComponentFixture<PsifasTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsifasTestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsifasTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
