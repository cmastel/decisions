// helper functions for the various Route files
const database = require('../db/database.js')
const mail = require('../public/scripts/mail.js')

// Implements the Borda Score based on guest submission
const switchStatement = index => {
  let number = 0;
  switch (index) {
  case '0':
    number = 4;
    break;
  case '1':
    number = 3;
    break;
  case '2':
    number = 2;
    break;
  case '3':
    number = 1;
  break;
  default:
    null;
  }
  return number;
}

// Gathers data required in order to send a mailgun email when a new pill is created
const emailNewPoll = function(db, userID, adminURL, guestURL) {
  database.getUserById(db, userID)
  .then(userData => {
    const userEmail = userData.email;
    const adminLink = 'http://localhost:8080/api/urls/admin/' + adminURL;
    const guestLink = 'http://localhost:8080/api/urls/guest/' + guestURL;
    mail.sendNewPollEmail(userEmail, [adminLink, guestLink]);
  })
}

// Gathers data required in order to send a mailgun email when a guest submits their poll response
const emailNewSubmission = function(db, questionID) {
  database.getUserByQuestionId(db, questionID)
  .then(user => {
    const adminLink = 'http://localhost:8080/api/urls/admin/' + user.admin_url;
    mail.sendNewSubmission(user.email, adminLink);
  })
}

module.exports = {
  switchStatement,
  emailNewPoll,
  emailNewSubmission
}
