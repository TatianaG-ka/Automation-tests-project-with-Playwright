import { expect, test } from '@_src/fixtures/merge.fixture';
import { waitForResponse } from '@_src/utils/wait.utils';

test.describe('Verify search component for articles', () => {
  test('go button should fetch articles @R07-01', async ({
    articlesPage,
    page,
  }) => {
    // Arrange
    const expectedDefaultArticleNumber = 6;
    await expect(articlesPage.searchButton).toBeInViewport();
    const responsePromise = waitForResponse(page, '/api/articles');

    // Act
    await articlesPage.searchButton.click();
    const response = await responsePromise;
    const body = await response.json();

    // Assert
    expect(response.ok()).toBeTruthy();
    expect(body).toHaveLength(expectedDefaultArticleNumber);
  });
});
