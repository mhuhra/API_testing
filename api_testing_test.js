const { randomUUID } = require('crypto');
const path = require('path');
const credentials = require(path.join(__dirname, 'credentials.json'));
const BASE_URL = process.env.TARGET_URL || 'https://crypto.cheipho.com/universal/mimic/cardrouting/api/v1';
const POST_PATH = process.env.POST_PATH || '/health/check';
const PAY_SALE_PATH = process.env.PAY_SALE_PATH || '/sale/create';

Feature('auth tests');
credentials.forEach(({ username, password}) => {
 Scenario(`Authorization: ${username}`, async ({ I }) => {
  const token = Buffer.from(`${username}:${password}`).toString('base64');
  I.haveRequestHeaders({
    Authorization: `Basic ${token}`,
    'Content-Type': 'application/json'
  });
  const res = await I.sendPostRequest(POST_PATH, {});
  const assert = require('assert').strict;
  if (username === 'testomat') {
    // Unauthorized model returns 200 with failure payload
    assert.equal(res.status, 200, `Expected 200 for ${username}, got ${res.status}`);
    assert.equal(res.data.success, false);
    assert.equal(res.data.error && res.data.error.code, 'UNAUTHORIZED');
    assert.equal(typeof res.data.error.details, 'string');
    assert.equal(typeof res.data.trace_id, 'string');
  } else {
    assert.equal(res.status, 200, `Expected 200 for ${username}, got ${res.status}`);
  }

});
});
Feature('auth tests_UNAUTHORIZED');
credentials.forEach(({ username }) => {
 Scenario(`Unauthorized without credentials: ${username}`, async ({ I }) => {
  // Do NOT set Authorization header to simulate unauthorized access
  I.haveRequestHeaders({
    'Content-Type': 'application/json'
  });
  const res = await I.sendPostRequest(POST_PATH, {});
  const assert = require('assert').strict;
  // Else model: status 200 with failure payload
  assert.equal(res.status, 200);
  assert.equal(res.data.success, false);
  assert.equal(res.data.error && res.data.error.code, 'UNAUTHORIZED');
  assert.equal(typeof res.data.error.details, 'string');
  assert.equal(typeof res.data.trace_id, 'string');

});
});

Feature('sale create - specific user');
Scenario('Create sale with testomat-ids credentials', async ({ I }) => {
  const username = 'testomat-ids';
  const password = 'y7p5oj6udfg527sw';
  const token = Buffer.from(`${username}:${password}`).toString('base64');
  I.haveRequestHeaders({
    Authorization: `Basic ${token}`,
    'Content-Type': 'application/json'
  });

  const body = {
    amount: {
      amount: '11.20',
      currency: 'EUR'
    },
    sale_id: randomUUID(),
    user: {
      user_id: 'jghjr5855458',
      email: 'm.gigolaeva@globo.games',
      kyc: {
        result: 'SUCCESS',
        verification_kind: 'NONE'
      },
      statistics: {
        registered_at: '2024-01-10',
        total_deposit_count: 6,
        total_withdrawal_count: 2
      }
    },
    bank_card: {
      cardholder: 'Q Q SEGMENT=TRUST METHOD=test_sale_testomat',
      cvv: '120',
      pan: '4444 4444 4444 4448',
      expiration_month: 3,
      expiration_year: 33
    },
    payment_profile: 'pp_debug_method_no_limits',
    merchant_user_entry_point_url: 'https://legendspin.com/'
  };

  const res = await I.sendPostRequest(PAY_SALE_PATH, body);
  const assert = require('assert').strict;
  assert.equal(res.status, 200);
  assert.equal(res.data.success, true);
  assert.equal(res.data.result && res.data.result.status, 'USER_INPUT_REQUIRED');
  assert.equal(typeof res.data.result.url_processing, 'string');
  assert.ok(/^https?:\/\//i.test(res.data.result.url_processing));
});
