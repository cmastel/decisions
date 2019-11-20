var API_KEY = process.env.MG_APIKEY;
var DOMAIN = process.env.MG_DOMAIN;
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
