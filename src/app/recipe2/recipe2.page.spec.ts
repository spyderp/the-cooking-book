import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Recipe2Page } from './recipe2.page';

describe('Recipe2Page', () => {
  let component: Recipe2Page;
  let fixture: ComponentFixture<Recipe2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Recipe2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Recipe2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
