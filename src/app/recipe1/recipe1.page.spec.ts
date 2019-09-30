import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Recipe1Page } from './recipe1.page';

describe('Recipe1Page', () => {
  let component: Recipe1Page;
  let fixture: ComponentFixture<Recipe1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Recipe1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Recipe1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
