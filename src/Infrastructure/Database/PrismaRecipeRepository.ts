import { PrismaClient } from '@prisma/client';
import { IRecipeRepository } from '../../core/repositories/IRecipeRepository';
import { Recipe } from '../../core/entities/Recipe';

export class PrismaRecipeRepository implements IRecipeRepository {
  private prisma = new PrismaClient();

  async save(recipe: Recipe): Promise<Recipe> {
    return this.prisma.recipe.create({ data: recipe });
  }

  async findAll(): Promise<Recipe[]> {
    return this.prisma.recipe.findMany();
  }
}