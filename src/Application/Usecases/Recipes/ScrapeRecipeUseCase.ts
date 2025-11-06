import { exec } from 'child_process';
import fs from 'fs';
import { IRecipeRepository } from '../../core/repositories/IRecipeRepository';
import { Recipe } from '../../core/entities/Recipe';

export class ScrapeRecipeUseCase {
  constructor(private repo: IRecipeRepository) {}

  async execute(htmlFilePath: string): Promise<Recipe> {
    return new Promise((resolve, reject) => {
      exec(`awk -f extract_recipes.awk ${htmlFilePath}`, (error, stdout) => {
        if (error) return reject(error);
        const data: any = {};
        stdout.split('\n').forEach(line => {
          const [key, value] = line.split('=');
          if (key && value) data[key.trim()] = value.trim();
        });
        const recipe: Recipe = {
          title: data.TITLE || 'Untitled',
          ingredients: data.INGREDIENTS || '',
          steps: '',
          sourceUrl: htmlFilePath
        };
        this.repo.save(recipe).then(resolve).catch(reject);
      });
    });
  }
}