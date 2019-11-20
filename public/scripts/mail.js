var API_KEY = '63e2ff7a2b23dd9a6c0c7ac6f2a3ad90-09001d55-48bfb466';
var DOMAIN = 'sandbox9473f324e5d14773bb2a8e33b4158e7e.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

const sendNewPollEmail = function (userEmail, links) {
  const data = {
    from: 'Decision Maker <me@samples.mailgun.org>',
    to: userEmail,
    subject: 'You Created a New Poll!',
    text: `Thank you for creating a new poll. Here are your admin and guest links:\nAdmin: ${links[0]}\nGuest: ${links[1]}`
  };
  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });
}

const sendNewSubmission = function (userEmail, link) {
  const data = {
    from: 'Decision Maker <me@samples.mailgun.org>',
    to: userEmail,
    subject: 'Your Poll Received a New Submission!',
    text: `One of your guests just submitted a response to your poll. Follow your Admin link to see the current results:\nAdmin: ${link}`
  };
  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });
};

module.exports = {
  sendNewPollEmail,
  sendNewSubmission,

}
