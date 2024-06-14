import { randomNewArticle } from '../src/factories/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  test('create new article @R04-01', async ({ page }) => {
    //Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);

    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();

    //Act
    await articlesPage.addArticleButtonLogged.click();

    const addArticleView = new AddArticleView(page);
    await expect.soft(addArticleView.header).toBeVisible();

    const articleData = randomNewArticle();
    await addArticleView.createArticle(articleData);

    //Assert
    const articlePage = new ArticlePage(page);
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });

    await expect
      .soft(page.getByTestId('alert-popup'))
      .toHaveText('Article was created');
  });

  test('reject creating article without title @R04-01', async ({ page }) => {
    //Array
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();

    //Act
    await articlesPage.addArticleButtonLogged.click();
    const addArticleView = new AddArticleView(page);

    const articleData = randomNewArticle();
    articleData.title = '';
    await addArticleView.createArticle(articleData);

    //Assert
    const expectedErrorMessage = 'Article was not created';
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });

  test('rejected creating article without body @R04-01', async ({ page }) => {
    //Arrange
    const loginPage = new LoginPage(page);
    const articlesPage = new ArticlesPage(page);
    const addArticleView = new AddArticleView(page);
    const articleData = randomNewArticle();
    articleData.body = '';
    const expectedErrorMessage = 'Article was not created';

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });
});
