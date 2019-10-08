import { TestBed } from '@angular/core/testing';

import { RecipeIngredientsService } from './recipe-ingredients.service';

describe('RecipeIngredientsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeIngredientsService = TestBed.get(RecipeIngredientsService);
    expect(service).toBeTruthy();
  });
});
