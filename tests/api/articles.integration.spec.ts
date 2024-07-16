import {
  apiLinks,
  getAuthorizationHeader,
  prepareArticlePayload,
} from '@_src/utils/api.utils';
import test, { expect } from '@playwright/test';

test.describe('Verify articles CRUD operations @crud @R08-01', () => {
  test('should not create article without a logged-in user', async ({
    request,
  }) => {
    //Array
    const expectedStatusCode = 401;

    const articleData = prepareArticlePayload();

    //Act
    const response = await request.post(apiLinks.articlesUrl, {
      data: articleData,
    });

    //Assert
    expect(response.status()).toBe(expectedStatusCode);
  });

  test('should create article with logged user @api', async ({ request }) => {
    //Array
    const headers = await getAuthorizationHeader(request);
    const expectedStatusCode = 201;
    const articleUrl = '/api/articles';

    //Act
    const articleData = prepareArticlePayload();

    //Arrange
    const responseArticle = await request.post(articleUrl, {
      headers,
      data: articleData,
    });

    //assert
    const actualResponseStatus = responseArticle.status();
    expect(
      actualResponseStatus,
      `expected status code ${expectedStatusCode} and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    const article = await responseArticle.json();
    expect(article.title).toEqual(articleData.title);
    expect(article.body).toEqual(articleData.body);
  });
});
