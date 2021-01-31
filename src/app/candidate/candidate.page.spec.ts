import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatePage } from './candidate.page';

describe('CandidatePage', () => {
  let component: CandidatePage;
  let fixture: ComponentFixture<CandidatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
