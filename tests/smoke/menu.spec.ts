import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { expect, test } from '@playwright/test';

test.describe('Verify menu main button', () => {
  test('comment button navigates to comments page @R01-03', async ({
    page,
  }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';
    const articlesPage = new ArticlesPage(page);
    // Act
    await articlesPage.goto();
    const commentsPage = await articlesPage.mainMenu.clickCommentsButton();
    const title = await commentsPage.getTitle();

    //Assert
    expect(title).toContain(expectedCommentsTitle);
  });

  test('articles button navigates to comments page @R01-03', async ({
    page,
  }) => {
    // Arrange
    const expectedArticleTitle = 'Articles';
    const commentsPage = new CommentsPage(page);
    // Act
    await commentsPage.goto();
    const articlesPage = await commentsPage.mainMenu.clickArticlesButton();
    const title = await articlesPage.getTitle();

    //Assert
    expect(title).toContain(expectedArticleTitle);
  });

  test('home page button navigates to main page @R01-03', async ({ page }) => {
    // Arrange
    const expectedHomePageTitle = '🦎 GAD';
    const articlesPage = new ArticlesPage(page);

    // Act
    await articlesPage.goto();
    const homePage = await articlesPage.mainMenu.clickHomePageLink();
    const title = await homePage.getTitle();

    //Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
