import { prepareRandomNewArticle } from '@_scr/factories/article.factory';
import { ArticlePage } from '@_scr/pages/article.page';
import { ArticlesPage } from '@_scr/pages/articles.page';
import { AddArticleView } from '@_scr/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();

    await expect.soft(addArticleView.addNewHeader).toBeVisible();
  });

  test('reject creating article without title @R04-01 @logged', async () => {
    //Array
    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomNewArticle();
    articleData.title = '';

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });

  test('reject creating article without body @R04-01 @logged', async () => {
    //Arrange
    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomNewArticle();
    articleData.body = '';

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });

  test.describe('test length', () => {
    test('reject creating title with exceeding 128 signs @R04-02 @logged', async () => {
      //Arrange
      const expectedErrorMessage = 'Article was not created';
      const articleData = prepareRandomNewArticle(129);

      //Act
      await addArticleView.createArticle(articleData);

      //Assert
      await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
    });

    test('create title with 128 signs @R04-02 @logged', async ({ page }) => {
      //Arrange
      const articlePage = new ArticlePage(page);
      const articleData = prepareRandomNewArticle(128);

      //Act
      await addArticleView.createArticle(articleData);

      //Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    });
  });
});
