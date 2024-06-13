import { AddArticleModel } from '../models/article.model';
import { Page } from '@playwright/test';

export class AddArticleView {
  header = this.page.getByRole('heading', { name: 'Add New Entry' });
  titleInput = this.page.getByTestId('title-input');
  bodyInput = this.page.getByTestId('body-text');
  saveButton = this.page.getByTestId('save');

  constructor(private page: Page) {}

  async createArticle(addArticleData: AddArticleModel): Promise<void> {
    await this.titleInput.fill(addArticleData.title);
    await this.bodyInput.fill(addArticleData.body);
    await this.saveButton.click();
  }
}
