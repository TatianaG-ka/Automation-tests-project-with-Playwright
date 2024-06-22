import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify menu main button', () => {
  test('comment button navigates to comments page @R01-03', async ({
    articlesPage,
  }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';
    // Act
    const commentsPage = await articlesPage.mainMenu.clickCommentsButton();
    const title = await commentsPage.getTitle();

    //Assert
    expect(title).toContain(expectedCommentsTitle);
  });

  test('articles button navigates to comments page @R01-03', async ({
    commentsPage,
  }) => {
    // Arrange
    const expectedArticleTitle = 'Articles';
    // Act
    const articlesPage = await commentsPage.mainMenu.clickArticlesButton();
    const title = await articlesPage.getTitle();

    //Assert
    expect(title).toContain(expectedArticleTitle);
  });

  test('home page button navigates to main page @R01-03', async ({ articlesPage }) => {
    // Arrange
    const expectedHomePageTitle = '🦎 GAD';

    // Act
    const homePage = await articlesPage.mainMenu.clickHomePageLink();
    const title = await homePage.getTitle();

    //Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
