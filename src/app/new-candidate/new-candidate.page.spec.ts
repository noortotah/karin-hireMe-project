import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCandidatePage } from './new-candidate.page';

describe('NewCandidatePage', () => {
  let component: NewCandidatePage;
  let fixture: ComponentFixture<NewCandidatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCandidatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCandidatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
