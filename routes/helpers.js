const database = require('../db/database.js')
const mail = require('../public/scripts/mail.js')

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

const emailNewPoll = function(db, userID, adminURL, guestURL) {
  database.getUserById(db, userID)
  .then(userData => {
    const userEmail = userData.email;
    const adminLink = 'http://localhost:8080/api/urls/admin/' + adminURL;
    const guestLink = 'http://localhost:8080/api/urls/guest/' + guestURL;
    // mail.sendNewPollEmail(userEmail, [adminLink, guestLink]);
  })
}

const emailNewSubmission = function(db, questionID) {
  database.getUserByQuestionId(db, questionID)
  .then(user => {
    console.log('userEmail', user.email)
    console.log('admin_url', user.admin_url)
    const adminLink = 'http://localhost:8080/api/urls/admin/' + user.admin_url;
    console.log('admin_link:', adminLink)
    // mail.sendNewSubmission(user.email, adminLink);
  })

}

module.exports = {
  switchStatement,
  emailNewPoll,
  emailNewSubmission
}
