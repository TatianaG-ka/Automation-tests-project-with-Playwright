import { RESPONSE_TIMEOUT } from '@_pw-config';
import { prepareRandomArticle } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articles', () => {
  test('reject creating article without title @R04-01 @logged', async ({
    addArticleView,
    page,
  }) => {
    //Array
    const expectedErrorMessage = 'Article was not created';
    const expectedResponseStatus = 422;

    const articleData = prepareRandomArticle();
    articleData.title = '';

    const responsePromise = page.waitForResponse('/api/articles', {
      timeout: RESPONSE_TIMEOUT,
    });

    //Act
    await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
    expect(response.status()).toBe(expectedResponseStatus);
  });

  test('reject creating article without body @R04-01 @logged', async ({
    addArticleView,
  }) => {
    //Arrange
    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomArticle();
    articleData.body = '';

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });

  test.describe('test length', () => {
    test('reject creating title with exceeding 128 signs @R04-02 @logged', async ({
      addArticleView,
    }) => {
      //Arrange
      const expectedErrorMessage = 'Article was not created';
      const articleData = prepareRandomArticle(129);

      //Act
      await addArticleView.createArticle(articleData);

      //Assert
      await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
    });

    test('create title with 128 signs @R04-02 @logged', async ({
      addArticleView,
    }) => {
      //Arrange
      const articleData = prepareRandomArticle(128);

      //Act
      const articlePage = await addArticleView.createArticle(articleData);

      //Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    });
  });
});
