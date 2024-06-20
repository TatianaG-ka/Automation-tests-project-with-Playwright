import { ArticlePage } from '@_src/pages/article.page';
import { expect, test } from '@playwright/test';

test('Non logged user can access created article @R05-01 @predefined_data', async ({
  page,
}) => {
  //Arrange
  const expectedArticleTitle = 'How to write effective test cases';
  const articlePage = new ArticlePage(page);

  //Act
  await articlePage.goto('?id=1');

  //Assert
  await expect(articlePage.articleTitle).toHaveText(expectedArticleTitle);
});
