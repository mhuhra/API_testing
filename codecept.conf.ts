import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: '(*_test.js)',
  output: '(./output)',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://crypto.cheipho.com/universal/mimic/cardrouting/api/v1',
      show: true,
      waitForTimeout: 30000
    },
     REST: {
      endpoint: process.env.TARGET_URL || 'https://crypto.cheipho.com/universal/mimic/cardrouting/api/v1',
      defaultHeaders: {
        'Content-Type': 'application/json'
      }
    }
  },
  include: {
  },
  bootstrap: null,
  mocha: {},
  name: 'API_testing'
}