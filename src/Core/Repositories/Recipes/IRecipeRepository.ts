import { Recipe } from '../entities/Recipe';

export interface IRecipeRepository {
  save(recipe: Recipe): Promise<Recipe>;
  findAll(): Promise<Recipe[]>;
}