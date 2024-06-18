import { prepareRandomNewArticle } from '@_scr/factories/article.factory';
import { AddArticleModel } from '@_scr/models/article.model';
import { ArticlePage } from '@_scr/pages/article.page';
import { ArticlesPage } from '@_scr/pages/articles.page';
import { AddArticleView } from '@_scr/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create, verify and delete article', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);

    await articlesPage.goto();
  });

  test('create new article @R04-01 @logged', async ({ page }) => {
    //Arrange
    articleData = prepareRandomNewArticle();

    //Act
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.addNewHeader).toBeVisible();
    await addArticleView.createArticle(articleData);

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });

    await expect
      .soft(page.getByTestId('alert-popup'))
      .toHaveText('Article was created');
  });

  test('user can access single article @R04-03 @logged', async () => {
    //Act
    await articlesPage.gotoArticle(articleData.title);

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('user can delete his own article @R04-04 @logged', async () => {
    //Arrange
    const expectedArticlesTitle = 'Articles';
    const expectedNoResultText = 'No data';
    await articlesPage.gotoArticle(articleData.title);

    //Act
    await articlePage.deleteArticle();

    //Assert
    await articlesPage.waitForPageToLoadUrl();
    const title = await articlesPage.getTitle();
    expect.soft(title).toContain(expectedArticlesTitle);

    await articlesPage.searchArticle(articleData.title);
    await expect(articlesPage.noResultText).toHaveText(expectedNoResultText);
  });
});
