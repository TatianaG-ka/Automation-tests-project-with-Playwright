import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify service main pages', () => {
  test('home page title @R01-01', async ({ homePage }) => {
    // Arrange
    const expectedHomePageTitle = 'GAD';

    // Assert
    const title = await homePage.getTitle();
    expect(title).toContain(expectedHomePageTitle);
  });

  test('articles page title @R01-02', async ({ articlesPage }) => {
    // Arrange
    const expectedArticleTitle = 'Articles';

    // Assert
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedArticleTitle);
  });

  test('comments page title @R01-02', async ({ commentsPage }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';

    // Assert
    const title = await commentsPage.getTitle();
    expect(title).toContain(expectedCommentsTitle);
  });

  test('home page title simple', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveTitle(/GAD/);
  });
});
