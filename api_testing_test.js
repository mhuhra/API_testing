
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
  require('assert').strict.equal(res.status, 200);

});
});
     
