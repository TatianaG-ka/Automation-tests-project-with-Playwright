import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { HomePage } from '@_src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify service main pages', () => {
  test('home page title @R01-01', async ({ page }) => {
    // Arrange
    const expectedHomePageTitle = 'GAD';
    const homePage = new HomePage(page);

    // Act
    await homePage.goto();

    // Assert
    const title = await homePage.getTitle();
    expect(title).toContain(expectedHomePageTitle);
  });

  test('articles page title @R01-02', async ({ page }) => {
    // Arrange
    const expectedArticleTitle = 'Articles';
    const articlesPage = new ArticlesPage(page);

    // Act
    await articlesPage.goto();

    // Assert
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedArticleTitle);
  });

  test('comments page title @R01-02', async ({ page }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';
    const commentsPage = new CommentsPage(page);

    // Act
    await commentsPage.goto();

    // Assert
    const title = await commentsPage.getTitle();
    expect(title).toContain(expectedCommentsTitle);
  });

  test('home page title simple', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveTitle(/GAD/);
  });
});
