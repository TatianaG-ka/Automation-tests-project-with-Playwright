import { prepareRandomArticle } from '@_src/factories/article.factory';
import { testUser1 } from '@_src/test-data/user.data';
import test, { expect } from '@playwright/test';

test.describe('Verify articles CRUD operations @crud @R08-01', () => {
  test('should not create article without a logged-in user', async ({
    request,
  }) => {
    //Array
    const articlesUrl = '/api/articles';
    const expectedStatusCode = 401;

    const randomArticleData = prepareRandomArticle();
    const articlesData = {
      title: randomArticleData.title,
      body: randomArticleData.body,
      date: '2024-07-15T10:17:55.324Z',
      image: '',
    };

    //Act
    const response = await request.post(articlesUrl, { data: articlesData });

    //Assert
    expect(response.status()).toBe(expectedStatusCode);
  });

  test('should create article with logged user @api', async ({ request }) => {
    //Array
    const expectedStatusCode = 201;
    const articleUrl = '/api/articles';
    const loginUrl = '/api/login';

    //Login
    const userData = {
      email: testUser1.userEmail,
      password: testUser1.userPassword,
    };

    const responseLogin = await request.post(loginUrl, { data: userData });
    const responseLoginJson = await responseLogin.json();

    const headers = {
      Authorization: `Bearer ${responseLoginJson.access_token}`,
    };

    //Act
    const randomArticleData = prepareRandomArticle();
    const articleData = {
      title: randomArticleData.title,
      body: randomArticleData.body,
      date: '2024-07-15T10:57:55.194Z',
      image:
        '.\\data\\images\\256\\tester-app_afe1cca6-98d2-4bda-a838-1d413552693e.jpg',
    };

    //Arrange
    const responseArticle = await request.post(articleUrl, {
      headers,
      data: articleData,
    });

    //assert
    const actualResponseStatus = responseArticle.status();
    expect(
      actualResponseStatus,
      `expected status code ${expectedStatusCode} and recieved ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    const article = await responseArticle.json();
    expect(article.title).toEqual(articleData.title);
    expect(article.body).toEqual(articleData.body);
  });
});
