import { PrismaRecipeRepository } from '../../infra/database/PrismaRecipeRepository';
import { ScrapeRecipeUseCase } from '../usecases/ScrapeRecipeUseCase';

(async () => {
  const repo = new PrismaRecipeRepository();
  const usecase = new ScrapeRecipeUseCase(repo);
  const file = process.argv[2] || 'sample.html';
  console.log('Scraping file:', file);
  await usecase.execute(file);
  console.log('Scraping completed.');
})();