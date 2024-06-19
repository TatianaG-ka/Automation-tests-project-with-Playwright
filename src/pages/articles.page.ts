import { MainMenuComponent } from '@_src/components/main-menu.components';
import { ArticlePage } from '@_src/pages/article.page';
import { BasePage } from '@_src/pages/base.page';
import { AddArticleView } from '@_src/views/add-article.view';
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

  async gotoArticle(title: string): Promise<ArticlePage> {
    await this.page.getByText(title).click();
    return new ArticlePage(this.page);
  }

  async searchArticle(phrases: string): Promise<ArticlesPage> {
    await this.searchField.fill(phrases);
    await this.searchButton.click();
    return this;
  }

  async clickAddArticleButtonLogged(): Promise<AddArticleView> {
    await this.addArticleButtonLogged.click();
    return new AddArticleView(this.page);
  }
}
