
const path = require('path');
const credentials = require(path.join(__dirname, 'credentials.json'));
const BASE_URL = process.env.TARGET_URL || 'https://crypto.cheipho.com/universal/mimic/cardrouting/api/v1';
const POST_PATH = process.env.POST_PATH || '/health/check';


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
