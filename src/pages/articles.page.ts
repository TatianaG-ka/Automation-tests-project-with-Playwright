import { MainMenuComponent } from '../components/main-menu.components';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  addArticleButtonLogged = this.page.locator('#add-new');
  searchField = this.page.getByTestId('search-input');
  searchButton = this.page.getByTestId('search-button');
  noResultText = this.page.getByTestId('no-results');

  mainMenu = new MainMenuComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async gotoArticle(title: string): Promise<void> {
    await this.page.getByText(title).click();
  }

  async searchArticle(phrases: string): Promise<void> {
    await this.searchField.fill(phrases);
    await this.searchButton.click();
  }
}
