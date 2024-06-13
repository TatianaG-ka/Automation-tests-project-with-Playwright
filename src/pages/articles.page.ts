import { MainMenuComponent } from '../components/main-menu.components';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  addArticleButtonLogged = this.page.locator('#add-new');

  mainMenu = new MainMenuComponent(this.page);

  constructor(page: Page) {
    super(page);
  }
}
