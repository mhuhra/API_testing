const { randomUUID } = require('crypto');
const path = require('path');
const credentials = require(path.join(__dirname, 'credentials.json'));
const bankCard = require(path.join(__dirname, 'bank_card.json'));
const BASE_URL = process.env.TARGET_URL || 'https://crypto.cheipho.com/universal/mimic/cardrouting/api/v1';
const POST_PATH = process.env.POST_PATH || '/health/check';
const PAY_SALE_PATH = process.env.PAY_SALE_PATH || '/sale/create';

// Feature('auth tests');
// credentials.forEach(({ username, password}) => {
//  Scenario(`Authorization: ${username}`, async ({ I }) => {
//   const token = Buffer.from(`${username}:${password}`).toString('base64');
//   I.haveRequestHeaders({
//     Authorization: `Basic ${token}`,
//     'Content-Type': 'application/json'
//   });
//   const res = await I.sendPostRequest(POST_PATH, {});
//   const assert = require('assert').strict;
//   if (username === 'testomat') {
//     // Unauthorized model returns 200 with failure payload
//     assert.equal(res.status, 200, `Expected 200 for ${username}, got ${res.status}`);
//     assert.equal(res.data.success, false);
//     assert.equal(res.data.error && res.data.error.code, 'UNAUTHORIZED');
//     assert.equal(typeof res.data.error.details, 'string');
//     assert.equal(typeof res.data.trace_id, 'string');
//   } else {
//     assert.equal(res.status, 200, `Expected 200 for ${username}, got ${res.status}`);
//   }

// });
// });
// Feature('auth tests_UNAUTHORIZED');
// credentials.forEach(({ username }) => {
//  Scenario(`Unauthorized without credentials: ${username}`, async ({ I }) => {
//   // Do NOT set Authorization header to simulate unauthorized access
//   I.haveRequestHeaders({
//     'Content-Type': 'application/json'
//   });
//   const res = await I.sendPostRequest(POST_PATH, {});
//   const assert = require('assert').strict;
//   // Else model: status 200 with failure payload
//   assert.equal(res.status, 200);
//   assert.equal(res.data.success, false);
//   assert.equal(res.data.error && res.data.error.code, 'UNAUTHORIZED');
//   assert.equal(typeof res.data.error.details, 'string');
//   assert.equal(typeof res.data.trace_id, 'string');

// });
// });

// Feature('sale create - success');
// Scenario('Create sale with testomat-ids credentials', async ({ I }) => {
//   const username = 'testomat-ids';
//   const password = 'y7p5oj6udfg527sw';
//   const token = Buffer.from(`${username}:${password}`).toString('base64');
//   I.haveRequestHeaders({
//     Authorization: `Basic ${token}`,
//     'Content-Type': 'application/json'
//   });

//   const body = {
//     amount: {
//       amount: '11.20',
//       currency: 'EUR'
//     },
//     sale_id: randomUUID(),
//     user: {
//       user_id: 'jghjr5855458',
//       email: 'm.gigolaeva@globo.games',
//       kyc: {
//         result: 'SUCCESS',
//         verification_kind: 'NONE'
//       },
//       statistics: {
//         registered_at: '2024-01-10',
//         total_deposit_count: 6,
//         total_withdrawal_count: 2
//       }
//     },
//     bank_card: bankCard,
//     payment_profile: 'pp_debug_method_no_limits',
//     merchant_user_entry_point_url: 'https://legendspin.com/'
//   };

//   const res = await I.sendPostRequest(PAY_SALE_PATH, body);
//   const assert = require('assert').strict;
//   assert.equal(res.status, 200);
//   assert.equal(res.data.success, true);
//   assert.equal(res.data.result && res.data.result.status, 'USER_INPUT_REQUIRED');
//   assert.equal(typeof res.data.result.url_processing, 'string');
//   assert.ok(/^https?:\/\//i.test(res.data.result.url_processing));
//   const processingUrl = res.data.result.url_processing;
// I.say(`Opening processing URL: ${processingUrl}`);
// await I.amOnPage(processingUrl);
//   // Robust polling for up to 120s: look in main and any iframe
//   const headerText = 'Test Payment Processor 3D Secure Challenge';
//   const successInput = 'input[value="Successfully complete 3DS challenge"]';
//   const successButton = 'button:has-text("Successfully complete 3DS challenge")';
//   const declineAny = 'input[value="Decline completing 3DS challenge"], button:has-text("Decline completing 3DS challenge")';
//   const failAny = 'input[value="Fail 3DS challenge (Invalid OTP)"], button:has-text("Fail 3DS challenge (Invalid OTP)")';

//   let clicked = false;
//   for (let i = 0; i < 120 && !clicked; i++) {
//     try {
//       // try in main context
//       const hasInput = await I.grabNumberOfVisibleElements(successInput);
//       const hasBtn = await I.grabNumberOfVisibleElements(successButton);
//       if (hasInput || hasBtn) {
//         await I.waitForText(headerText, 5);
//         I.seeElement(declineAny);
//         I.seeElement(failAny);
//         await I.click(hasInput ? successInput : successButton);
//         clicked = true;
//         break;
//       }

//       // try inside iframes
//       const iframeCount = await I.grabNumberOfVisibleElements('iframe');
//       for (let idx = 1; idx <= iframeCount && !clicked; idx++) {
//         try {
//           I.switchTo(locate('iframe').at(idx));
//           const inInput = await I.grabNumberOfVisibleElements(successInput);
//           const inBtn = await I.grabNumberOfVisibleElements(successButton);
//           if (inInput || inBtn) {
//             await I.waitForText(headerText, 5);
//             I.seeElement(declineAny);
//             I.seeElement(failAny);
//             await I.click(inInput ? successInput : successButton);
//             clicked = true;
//             break;
//           }
//         } finally {
//           I.switchTo();
//         }
//       }
//     } catch (e) {
//       // ignore and retry
//     }
//     if (!clicked) await I.wait(1);
//   }

//   if (!clicked) throw new Error('3DS success option not found within 120s');
//   await I.waitForText('Payment succesfull', 15);
//   I.seeElement('svg[xmlns="http://www.w3.org/2000/svg"]');
//   await I.wait(2);
//   await I.saveScreenshot('after_3ds.png', true);

// });


// Feature('sale create - declined');
// Scenario('Create sale with testomat-ids declined', async ({ I }) => {
//   const username = 'testomat-ids';
//   const password = 'y7p5oj6udfg527sw';
//   const token = Buffer.from(`${username}:${password}`).toString('base64');
//   I.haveRequestHeaders({
//     Authorization: `Basic ${token}`,
//     'Content-Type': 'application/json'
//   });

//   const body = {
//     amount: {
//       amount: '11.20',
//       currency: 'EUR'
//     },
//     sale_id: randomUUID(),
//     user: {
//       user_id: 'jghjr5855458',
//       email: 'm.gigolaeva@globo.games',
//       kyc: {
//         result: 'SUCCESS',
//         verification_kind: 'NONE'
//       },
//       statistics: {
//         registered_at: '2024-01-10',
//         total_deposit_count: 6,
//         total_withdrawal_count: 2
//       }
//     },
//     bank_card: bankCard,
//     payment_profile: 'pp_debug_method_no_limits',
//     merchant_user_entry_point_url: 'https://legendspin.com/'
//   };

//   const res = await I.sendPostRequest(PAY_SALE_PATH, body);
//   const assert = require('assert').strict;
//   assert.equal(res.status, 200);
//   assert.equal(res.data.success, true);
//   assert.equal(res.data.result && res.data.result.status, 'USER_INPUT_REQUIRED');
//   assert.equal(typeof res.data.result.url_processing, 'string');
//   assert.ok(/^https?:\/\//i.test(res.data.result.url_processing));
//   const processingUrl = res.data.result.url_processing;
// I.say(`Opening processing URL: ${processingUrl}`);
// await I.amOnPage(processingUrl);
//   // Robust polling for up to 120s: look in main and any iframe
//   const headerText = 'Test Payment Processor 3D Secure Challenge';
//   const declineInput = 'input[value="Decline completing 3DS challenge"]';
//   const declineButton = 'button:has-text("Decline completing 3DS challenge")';
//   const successAny = 'input[value="Successfully complete 3DS challenge"], button:has-text("Successfully complete 3DS challenge")';
//   const failAny = 'input[value="Fail 3DS challenge (Invalid OTP)"], button:has-text("Fail 3DS challenge (Invalid OTP)")';

//   let clicked = false;
//   for (let i = 0; i < 120 && !clicked; i++) {
//     try {
//       // try in main context
//       const hasInput = await I.grabNumberOfVisibleElements(declineInput);
//       const hasBtn = await I.grabNumberOfVisibleElements(declineButton);
//       if (hasInput || hasBtn) {
//         await I.waitForText(headerText, 5);
//         I.seeElement(successAny);
//         I.seeElement(failAny);
//         await I.click(hasInput ? declineInput : declineButton);
//         clicked = true;
//         break;
//       }

//       // try inside iframes
//       const iframeCount = await I.grabNumberOfVisibleElements('iframe');
//       for (let idx = 1; idx <= iframeCount && !clicked; idx++) {
//         try {
//           I.switchTo(locate('iframe').at(idx));
//           const inInput = await I.grabNumberOfVisibleElements(declineInput);
//           const inBtn = await I.grabNumberOfVisibleElements(declineButton);
//           if (inInput || inBtn) {
//             await I.waitForText(headerText, 5);
//             I.seeElement(successAny);
//             I.seeElement(failAny);
//             await I.click(inInput ? declineInput : declineButton);
//             clicked = true;
//             break;
//           }
//         } 
//         finally {
//           I.switchTo();
//         }
//       }
//     } catch (e) {
//       // ignore and retry
//     }
//     if (!clicked) await I.wait(1);
//   }

//   if (!clicked) throw new Error('3DS success option not found within 120s');
//   await I.waitForText('Something went wrong', 15);
//   I.seeElement('svg[xmlns="http://www.w3.org/2000/svg"]');
//   await I.wait(2);
//   await I.saveScreenshot('after_3ds.png', true);

// });

Feature('sale create - failed');
Scenario('Create sale with testomat-ids failed', async ({ I }) => {
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
    bank_card: bankCard,
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
  const processingUrl = res.data.result.url_processing;
I.say(`Opening processing URL: ${processingUrl}`);
await I.amOnPage(processingUrl);
  // Robust polling for up to 120s: look in main and any iframe
  const headerText = 'Test Payment Processor 3D Secure Challenge';
  const failInput = 'input[value="Fail 3DS challenge (Invalid OTP)"]';
  const failButton = 'button:has-text("Fail 3DS challenge (Invalid OTP)")';
  const successAny = 'input[value="Successfully complete 3DS challenge"], button:has-text("Successfully complete 3DS challenge")';
  const declineAny = 'input[value="Decline completing 3DS challenge"], button:has-text("Decline completing 3DS challenge")';

  let clicked = false;
  for (let i = 0; i < 120 && !clicked; i++) {
    try {
      // try in main context
      const hasInput = await I.grabNumberOfVisibleElements(failInput);
      const hasBtn = await I.grabNumberOfVisibleElements(failButton);
      if (hasInput || hasBtn) {
        await I.waitForText(headerText, 5);
        I.seeElement(successAny);
        I.seeElement(declineAny);
        await I.click(hasInput ? failInput : failButton);
        clicked = true;
        break;
      }

      // try inside iframes
      const iframeCount = await I.grabNumberOfVisibleElements('iframe');
      for (let idx = 1; idx <= iframeCount && !clicked; idx++) {
        try {
          I.switchTo(locate('iframe').at(idx));
          const inInput = await I.grabNumberOfVisibleElements(failInput);
          const inBtn = await I.grabNumberOfVisibleElements(failButton);
          if (inInput || inBtn) {
            await I.waitForText(headerText, 5);
            I.seeElement(successAny);
            I.seeElement(declineAny);
            await I.click(inInput ? failInput : failButton);
            clicked = true;
            break;
          }
        } 
        finally {
          I.switchTo();
        }
      }
    } catch (e) {
      // ignore and retry
    }
    if (!clicked) await I.wait(1);
  }

  if (!clicked) throw new Error('3DS success option not found within 120s');
  await I.waitForText('3Ds failed', 15);
  I.seeElement('svg[xmlns="http://www.w3.org/2000/svg"]');
  await I.wait(2);
  await I.saveScreenshot('after_3ds.png', true);

});

