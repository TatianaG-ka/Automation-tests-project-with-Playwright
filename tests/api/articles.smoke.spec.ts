import test, { expect } from '@playwright/test';

test.describe('Verify articles API endpoint', () => {
  test('GET articles returns status code 200, @R07-01 @api', async ({
    request,
  }) => {
    //Array
    const expectedStatusCode = 200;
    const articleUrl = '/api/articles';
    //Act
    const response = await request.get(articleUrl);

    //Assert
    expect(response.status()).toBe(expectedStatusCode);
  });

  test('GET articles should return at least one article @predefined_data', async ({
    request,
  }) => {
    //Array
    const expectedMinArticlesCount = 1;
    const articlesUrl = '/api/articles';

    //Act
    const response = await request.get(articlesUrl);
    const responseJason = await response.json();

    //Assert
    expect(responseJason.length).toBeGreaterThanOrEqual(
      expectedMinArticlesCount,
    );
  });

  test('GET articles return article object @predefined_data', async ({
    request,
  }) => {
    //Array
    const expectedRequeredFields = [
      'id',
      'user_id',
      'body',
      'title',
      'date',
      'image',
    ];
    const articlesUrl = '/api/articles';

    //Act
    const response = await request.get(articlesUrl);
    const responseJason = await response.json();
    const article = responseJason[0];

    //Assert
    expectedRequeredFields.forEach((key) => {
      expect.soft(article).toHaveProperty(key);
    });
  });
});
