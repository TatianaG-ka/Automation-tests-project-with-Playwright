# Tests for todoist application

## todoist Application

Repository:****\_\_\_\_****

Follow instructions in app README

## Prepare

### Local recommended tools:

- VS Code
- Git
- Node.js (version >16)

### Installation and setup

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- setup husky with: `npx husky install`
- prepare local env file: 'cp .env-template .env'
- copy application main URL as value of 'BASE_URL' variable in '.env' file

## Use

Run all tests:

```
npx playwright test
```

Run all tests with tags:

```
npx playwright test --grep "@R01-01"
```
Run all tests without tags:

```
npx playwright test --grep-invert "@TDI-R01-01"
```

For more usage cases look in `package.json` scripts section.
