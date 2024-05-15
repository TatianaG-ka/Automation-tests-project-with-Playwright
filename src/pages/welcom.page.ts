import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class WelcomPage extends BasePage {
  url = '/welcom';

  constructor(page: Page) {
    super(page);
  }
}
