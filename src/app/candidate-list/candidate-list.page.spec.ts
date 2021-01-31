import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListPage } from './candidate-list.page';

describe('CandidateListPage', () => {
  let component: CandidateListPage;
  let fixture: ComponentFixture<CandidateListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
