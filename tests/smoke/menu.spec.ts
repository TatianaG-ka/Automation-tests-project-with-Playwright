import { ArticlesPage } from '@_scr/pages/articles.page';
import { CommentsPage } from '@_scr/pages/comments.page';
import { HomePage } from '@_scr/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify menu main button', () => {
  test('comment button navigates to comments page @R01-03', async ({
    page,
  }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';
    const articlesPage = new ArticlesPage(page);
    const commentsPage = new CommentsPage(page);

    // Act
    await articlesPage.goto();
    await articlesPage.mainMenu.commentsButton.click();
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
    const articlesPage = new ArticlesPage(page);

    // Act
    await commentsPage.goto();
    await commentsPage.mainMenu.articlesButton.click();
    const title = await articlesPage.getTitle();

    //Assert
    expect(title).toContain(expectedArticleTitle);
  });

  test('home page button navigates to main page @R01-03', async ({ page }) => {
    // Arrange
    const expectedHomePageTitle = '🦎 GAD';
    const articlesPage = new ArticlesPage(page);
    const homePage = new HomePage(page);

    // Act
    await articlesPage.goto();
    await articlesPage.mainMenu.homePage.click();
    const title = await homePage.getTitle();

    //Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
