import { MainMenuComponent } from '../components/main-menu.components';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  addArticleButtonLogged = this.page.locator('#add-new');
  searchField = this.page.getByTestId('search-input');
  searchButton = this.page.getByTestId('search-button');;

  mainMenu = new MainMenuComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async gotoArticle(title: string): Promise<void> {
    this.page.getByText(title).click();
  }
}
