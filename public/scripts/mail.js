var API_KEY = '63e2ff7a2b23dd9a6c0c7ac6f2a3ad90-09001d55-48bfb466';
var DOMAIN = 'sandbox9473f324e5d14773bb2a8e33b4158e7e.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

const data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'chris.mastel@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};

mailgun.messages().send(data, (error, body) => {
  console.log(body);
});