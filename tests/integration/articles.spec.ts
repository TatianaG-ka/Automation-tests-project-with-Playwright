import { RESPONSE_TIMEOUT } from '@_pw-config';
import { prepareRandomArticle } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { waitForResponse } from '@_src/utils/wait.utils';

test.describe('Verify articles', () => {
  test('reject creating article without title @R04-01 @R06-03 @logged', async ({
    addArticleView,
    page,
  }) => {
    //Array
    const expectedErrorMessage = 'Article was not created';
    const expectedResponseStatus = 422;

    const articleData = prepareRandomArticle();
    articleData.title = '';

    const responsePromise = waitForResponse(page, '/api/articles');

    //Act
    await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
    expect(response.status()).toBe(expectedResponseStatus);
  });

  test('reject creating article without body @R04-01 @R06-03 @logged', async ({
    addArticleView,
    page,
  }) => {
    //Arrange
    const expectedResponseStatus = 422;
    const expectedErrorMessage = 'Article was not created';

    const articleData = prepareRandomArticle();
    articleData.body = '';

    const responsePromise = waitForResponse(page, '/api/articles');

    //Act
    await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
    expect(response.status()).toBe(expectedResponseStatus);
  });

  test.describe('test length', () => {
    test('reject creating title with exceeding 128 signs @R04-02 @logged', async ({
      addArticleView,
      page,
    }) => {
      //Arrange
      const expectedErrorMessage = 'Article was not created';
      const expectedResponseStatus = 422;
      const articleData = prepareRandomArticle(129);

      const responsePromise = waitForResponse(page, '/api/articles');

      //Act
      await addArticleView.createArticle(articleData);
      const response = await responsePromise;

      //Assert
      await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
      expect(response.status()).toBe(expectedResponseStatus);
    });

    test('create title with 128 signs @R04-02 @logged', async ({
      addArticleView,
      page,
    }) => {
      //Arrange
      const expectedResponseStatus = 201;
      const articleData = prepareRandomArticle(128);
      const responsePromise = waitForResponse(page, '/api/articles*');

      //Act
      const articlePage = await addArticleView.createArticle(articleData);
      const response = await responsePromise;

      //Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      expect(response.status()).toBe(expectedResponseStatus);
    });
  });

  test('create title from API @R06-04 @logged', async ({
    addArticleView,
    page,
  }) => {
    //Arrange
    const articleData = prepareRandomArticle();
    const responsePromise = page.waitForResponse(
      (response) => {
        return (
          response.url().includes('/api/articles') &&
          response.request().method() == 'GET'
        );
      },
      { timeout: RESPONSE_TIMEOUT },
    );

    //Act
    const articlePage = await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    expect(response.ok()).toBeTruthy();
  });
});
