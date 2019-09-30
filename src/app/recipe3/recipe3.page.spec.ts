import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Recipe3Page } from './recipe3.page';

describe('Recipe3Page', () => {
  let component: Recipe3Page;
  let fixture: ComponentFixture<Recipe3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Recipe3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Recipe3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
