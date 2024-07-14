import test, { expect } from '@playwright/test';

test.describe('Verify articles API endpoint', () => {
  test('GET articles returns status code 200, @R07-01 @api', async ({ request }) => {
    //Array
    const expectedStatusCode = 200;
    const articleUrl = '/api/articles';
    //Act
    const response = await request.get(articleUrl);

    //Assert
    expect(response.status()).toBe(expectedStatusCode);
  });
});
